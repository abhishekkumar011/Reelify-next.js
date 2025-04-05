import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and Password is required",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is already exists",
        },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering the user", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
