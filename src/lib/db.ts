import { db } from './firebaseAdmin';
import { Squad, CareerSave, ChatMessage } from './types';

export async function getUserActiveSquad(userId: string): Promise<Squad | null> {
    const snapshot = await db.collection('squads')
        .where('userId', '==', userId)
        .limit(1)
        .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as Squad;
}

export async function getUserActiveCareer(userId: string): Promise<CareerSave | null> {
    const snapshot = await db.collection('careerSaves')
        .where('userId', '==', userId)
        .limit(1)
        .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as CareerSave;
}

export async function saveChatMessage(
    userId: string,
    chatId: string,
    message: ChatMessage
) {
    // Ensure the chat document exists
    await db.collection('chats').doc(chatId).set({
        userId,
        updatedAt: new Date()
    }, { merge: true });

    // Add the message to the subcollection
    return db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message);
}

export async function updateCareerBudget(
    saveId: string,
    newBudget: { transferBudget?: number; wageBudget?: number }
) {
    return db.collection('careerSaves').doc(saveId).update(newBudget);
}
