import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User, { IUser } from "@/models/User.models";
import Trade, { ITrade } from "@/models/Trade.models";
import mongoose from "mongoose";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body = await req.json() as { email?: string };
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Find User by email
    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Find all trades for the user
    const trades = await Trade.find({ userId: user._id }) as ITrade[];

    // Calculate portfolio value & average ESG score
    let totalBuy = 0;
    let totalSell = 0;
    let holdingValue = 0;
    let totalShares = 0;
    let esgSum = 0;

    trades.forEach((trade) => {
      const { action, pricePerShare, noOfShares, esgValue } = trade;

      if (action === "buy") totalBuy += pricePerShare * noOfShares;
      else if (action === "sell") totalSell += pricePerShare * noOfShares;

      // Assume currentPrice = pricePerShare for simplicity or replace with market price if available
      holdingValue += noOfShares * pricePerShare;
      totalShares += noOfShares;
      esgSum += noOfShares * esgValue;
    });

    const mockMoney = 100000; // Initial capital

    // Calculate total portfolio value (you can tweak formula based on your logic)
    const portfolioTotal = mockMoney - totalBuy + totalSell + holdingValue;

    // Average ESG score weighted by number of shares
    const avgEsgScore = totalShares > 0 ? esgSum / totalShares : 0;

    // Update user document fields accordingly
    user.portfolioValue.total = portfolioTotal;
    // For normalized values you might want a separate normalization function or data
    user.esgScore.average = avgEsgScore;

    await user.save();

    return NextResponse.json({
      message: "Holdings fetched successfully",
      user,
      trades,
      portfolioValue: user.portfolioValue,
      avgEsgScore: user.esgScore.average,
    }, { status: 200 });

  } catch (error) {
    console.error("Error in holdings API:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
