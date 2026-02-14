import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '@/lib/firebaseAdmin';
import { getUserActiveSquad, getUserActiveCareer, saveChatMessage } from '@/lib/db';
import { getSystemPrompt, ActiveMode } from '@/lib/personas';
import { ChatMessage } from '@/lib/types';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, activeMode, data, chatId } = await req.json() as {
            messages: any[];
            activeMode: ActiveMode;
            data?: { image?: string };
            chatId: string;
        };

        // 1. Authenticate
        const authHeader = req.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return new Response('Unauthorized', { status: 401 });
        }
        const idToken = authHeader.split('Bearer ')[1];
        const decodedToken = await auth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        // 2. Load Context
        let contextData = '';
        if (activeMode === 'LAB') {
            const squad = await getUserActiveSquad(userId);
            if (squad) {
                contextData = `Current Squad: ${JSON.stringify(squad)}`;
            }
        } else if (activeMode === 'BOARDROOM') {
            const career = await getUserActiveCareer(userId);
            if (career) {
                contextData = `Current Career Save: ${JSON.stringify(career)}`;
            }
        }

        // 3. Prepare System Prompt
        const systemPrompt = `${getSystemPrompt(activeMode)}\n\nUser Context:\n${contextData}`;

        // 4. Multimodal Processing & AI Execution
        const result = await streamText({
            model: google('gemini-1.5-pro'), // Use a multimodal capable model
            system: systemPrompt,
            messages: messages.map(m => {
                if (m.role === 'user' && data?.image && m === messages[messages.length - 1]) {
                    return {
                        ...m,
                        content: [
                            { type: 'text', text: m.content },
                            { type: 'image', image: data.image }
                        ]
                    };
                }
                return m;
            }),
            onFinish: async (finalResult) => {
                // 5. Asynchronously Persistence
                const userMsg = messages[messages.length - 1];
                const assistantMsgContent = finalResult.text;

                const userChatMessage: ChatMessage = {
                    content: userMsg.content,
                    role: 'user',
                    modeContext: activeMode,
                    hasImageAttachment: !!data?.image,
                    createdAt: new Date()
                };

                const assistantChatMessage: ChatMessage = {
                    content: assistantMsgContent,
                    role: 'assistant',
                    modeContext: activeMode,
                    hasImageAttachment: false,
                    createdAt: new Date()
                };

                await Promise.all([
                    saveChatMessage(userId, chatId, userChatMessage),
                    saveChatMessage(userId, chatId, assistantChatMessage)
                ]);
            }
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
