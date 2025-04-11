import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/user";

export async function POST(req) {
  try {
    console.log("[SIGNUP] Connecting to MongoDB...");
    await connectDB();
    console.log("[SIGNUP] DB connected.");

    const { email, password, username } = await req.json();
    console.log("[SIGNUP] Received payload:", { email, username });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("[SIGNUP] User already exists.");
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[SIGNUP] Password hashed.");

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();
    console.log("[SIGNUP] New user saved.");

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("[SIGNUP] JWT token created.");

    return NextResponse.json({
      token,
      userId: newUser._id,
      username: newUser.username
    });
  } catch (err) {
    console.error("[SIGNUP ERROR]", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}