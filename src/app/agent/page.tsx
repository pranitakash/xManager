"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Image as ImageIcon,
    Paperclip,
    Zap,
    Sparkles,
    Bot,
    User
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { GridPattern } from "@/components/ui/grid-pattern";

type Mode = "lab" | "boardroom";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function AgentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialMode = (searchParams.get("mode") as Mode) || "lab";

    const [mode, setMode] = useState<Mode>(initialMode);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: initialMode === "lab"
                ? "Tactical synthesis initialized. How can I assist with your squad development today?"
                : "Executive briefing ready. What strategic oversight do you require for the current fiscal cycle?",
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: mode === "lab"
                    ? "Analyzing tactical patterns... based on the current meta, I recommend adjusting your defensive width to 45 and utilizing 'Step Up' on your primary CB."
                    : "Reviewing financial forecasts... prioritizing high-yield scouting in the South American region will yield a 15% ROI increase by next window.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <main className="h-screen bg-[#0B0E14] text-white selection:bg-white/10 flex flex-col overflow-hidden relative">
            <Navbar />
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] opacity-10",
                )}
            />

            {/* Subdued Switcher */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
                <BlurFade delay={0.1}>
                    <div className="p-1 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-xl flex items-center gap-0.5">
                        <button
                            onClick={() => setMode("lab")}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                                mode === "lab"
                                    ? "bg-white/10 text-white shadow-xl"
                                    : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            Lab
                        </button>
                        <button
                            onClick={() => setMode("boardroom")}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                                mode === "boardroom"
                                    ? "bg-white/10 text-white shadow-xl"
                                    : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            Boardroom
                        </button>
                    </div>
                </BlurFade>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto pt-44 pb-32 px-6 scrollbar-hide flex flex-col items-center"
            >
                <div className="w-full max-w-3xl space-y-10">
                    <AnimatePresence mode="popLayout">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={cn(
                                    "flex flex-col gap-3",
                                    msg.role === "user" ? "items-end" : "items-start"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    {msg.role === "assistant" ? (
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center border",
                                            mode === "lab" ? "bg-[#00FF41]/10 border-[#00FF41]/20 text-[#00FF41]" : "bg-[#EAB308]/10 border-[#EAB308]/20 text-[#EAB308]"
                                        )}>
                                            <Bot className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-600">
                                        {msg.role === "assistant" ? "xManager Intelligence" : "Director"}
                                    </span>
                                </div>
                                <div className={cn(
                                    "max-w-[85%] p-6 rounded-3xl text-sm font-medium leading-relaxed",
                                    msg.role === "user"
                                        ? "bg-white/5 border border-white/10 text-white rounded-tr-none"
                                        : "bg-[#0B0E14] border border-white/5 text-gray-300 rounded-tl-none shadow-xl"
                                )}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-gray-600 ml-11"
                        >
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Input Space - Floating Capsule */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
                <BlurFade delay={0.2}>
                    <div className="relative group">
                        {/* Capsule Background */}
                        <div className="absolute inset-0 bg-white shadow-[0_0_50px_rgba(255,255,255,0.05)] rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />

                        <div className="relative flex items-center gap-3 p-2 bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl transition-all duration-300 group-focus-within:border-white/10 group-focus-within:bg-white/[0.04]">
                            {/* Attachment Button */}
                            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                                <Paperclip className="w-4 h-4" />
                            </button>

                            {/* Typing Area */}
                            <input
                                type="text"
                                placeholder={`Ask xManager...`}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-800 text-sm py-3 px-1 outline-none font-medium tracking-tight"
                            />

                            {/* Image Button */}
                            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                                <ImageIcon className="w-4 h-4" />
                            </button>

                            {/* Send Button */}
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                                    input.trim()
                                        ? "bg-white text-black scale-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        : "bg-white/5 text-gray-700 scale-95 opacity-50"
                                )}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </BlurFade>
            </div>
        </main>
    );
}
