import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { playerId, currentPrice, history } = await request.json();

        if (!playerId || !currentPrice) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Simulate AI logic based on history and current price
        // In a real scenario, this would call an ML model
        const trend = history && history.length > 1
            ? history[history.length - 1].price - history[0].price
            : 0;

        const volatility = Math.random() * 0.05; // 5% volatility
        const predictionChange = (trend > 0 ? 1 : -1) * volatility;
        const predictedPrice = Math.round(currentPrice * (1 + predictionChange));

        const confidence = Math.round(70 + Math.random() * 25); // 70-95% confidence

        return NextResponse.json({
            playerId,
            predictedPrice,
            confidence,
            timestamp: new Date().toISOString(),
            recommendation: predictionChange > 0 ? 'BUY' : 'HOLD'
        });
    } catch (error) {
        console.error('Error in AI prediction:', error);
        return NextResponse.json({ error: 'Failed to generate prediction' }, { status: 500 });
    }
}
