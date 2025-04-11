import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/user";

export async function POST(req) {
  try {
    console.log("[LOGIN] Connecting to MongoDB...");
    await connectDB();
    console.log("[LOGIN] DB connected.");

    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.error("[LOGIN] Failed to parse JSON body");
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    console.log("[LOGIN] Request body:", { email });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("[LOGIN] User not found for email:", email);
      return NextResponse.json({ error: "Email not registered" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("[LOGIN] Invalid password for user:", email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("[LOGIN] JWT token created.");

    return NextResponse.json({
      token,
      userId: user._id,
      username: user.username
    });
  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}