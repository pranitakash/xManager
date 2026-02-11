import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const filePath = path.join(process.cwd(), 'public/data/market-players.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const players = JSON.parse(fileData);

        const player = players.find((p: any) => p.id === id);

        if (!player) {
            return NextResponse.json({ error: 'Player not found' }, { status: 404 });
        }

        return NextResponse.json(player);
    } catch (error) {
        console.error('Error fetching player details:', error);
        return NextResponse.json({ error: 'Failed to fetch player details' }, { status: 500 });
    }
}
