import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Trade from '@/models/Trade.models';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    // Basic validation
    const { company, participant, round, tradeType, quantity, price, tradeTime } = data;

    if (!company || !participant || !round || !tradeType || !quantity || !price || !tradeTime) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!['buy', 'sell'].includes(tradeType)) {
      return NextResponse.json({ error: 'tradeType must be either "buy" or "sell".' }, { status: 400 });
    }

    const trade = new Trade({
      company,
      participant,
      round,
      tradeType,
      quantity,
      price,
      tradeTime: new Date(tradeTime), // ensure date type
    });

    await trade.save();

    return NextResponse.json({ message: 'Trade submitted successfully.', trade }, { status: 201 });
  } catch (error) {
    console.error('Error submitting trade:', error);
    return NextResponse.json({ error: 'Failed to submit trade.' }, { status: 500 });
  }
}
