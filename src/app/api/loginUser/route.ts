import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.models";
import connectDB from "@/lib/connectDB";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, mobileNo, enrollment } = await req.json();

    if (!name || !email || !mobileNo || !enrollment) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    let user = await User.findOne({ email, mobileNo });

    if (!user) {
      user = await User.create({ name, email, mobileNo, enrollment });
    }

    return NextResponse.json({
      message: "User login/register successful",
      user: {
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        enrollment: user.enrollment,
        userId: user._id
      },
    });
  } catch (error) {
    console.error("Login/Register Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
