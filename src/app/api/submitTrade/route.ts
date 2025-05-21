import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Trade from '@/models/Trade.models';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    // Destructure the required fields
    const { companyName, userId, action, noOfShares, pricePerShare, esgValue, timestamp } = data;
    console.log('Received data:', data);
    // Basic validation
    if (!companyName || !userId || !action || !noOfShares || !pricePerShare || !esgValue || !timestamp) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!['buy', 'sell'].includes(action)) {
      return NextResponse.json({ error: 'action must be either "buy" or "sell".' }, { status: 400 });
    }

    const trade = new Trade({
      companyName,
      userId,
      action,
      noOfShares,
      pricePerShare,
      esgValue,
      timestamp: new Date(timestamp), // ensure it's stored as a Date
    });

    await trade.save();

    return NextResponse.json({ message: 'Trade submitted successfully.', trade }, { status: 201 });
  } catch (error) {
    console.error('Error submitting trade:', error);
    return NextResponse.json({ error: 'Failed to submit trade.' }, { status: 500 });
  }
}
