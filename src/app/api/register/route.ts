import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received registration data:", body);

    const { username, password, email, first_name, last_name } = body;

    // Check if user already exists
    const existingUser = await prisma.user_auth.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }
    const saltRounds = 10;
    // Hash the password
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prisma.user_auth.create({
      data: {
        username,
        password_hash: hashedPassword,
        email,
        first_name,
        last_name,
      },
    });

    console.log("New user created:", newUser);

    // Don't send the password hash back to the client
    const { password_hash, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    // Ensure we're always returning a valid JSON response
    return NextResponse.json(
      {
        error: "An error occurred during registration",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
