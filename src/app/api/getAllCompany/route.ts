import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Company from '@/models/Company.models';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const companies = await Company.find({}); // fetch all companies

    return NextResponse.json({ companies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Failed to fetch companies.' }, { status: 500 });
  }
}
