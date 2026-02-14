import { Timestamp } from 'firebase-admin/firestore';

export interface UserPreferences {
    defaultMode: 'LAB' | 'BOARDROOM';
}

export interface User {
    uid: string;
    preferences: UserPreferences;
}

export interface SquadPlayer {
    playerID: string;
    position: string;
    chemistryStyle?: string;
}

export interface Squad {
    squadId: string;
    userId: string;
    formation: string;
    players: SquadPlayer[];
}

export interface CareerSave {
    saveId: string;
    userId: string;
    clubName: string;
    currentSeasonYear: number;
    transferBudget: number;
    wageBudget: number;
}

export interface ChatMessage {
    content: string;
    role: 'user' | 'assistant';
    modeContext: 'LAB' | 'BOARDROOM';
    hasImageAttachment: boolean;
    createdAt: Timestamp | Date;
}

export interface Chat {
    chatId: string;
    userId: string;
}
