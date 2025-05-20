import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import User from '@/models/User.models';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await User.find({}, '-password'); // Exclude password field for security

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users.' }, { status: 500 });
  }
}
