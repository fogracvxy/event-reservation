import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import authOptions from "../../lib/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");

  const events = await prisma.event.findMany({
    where: level ? { level: level as string } : {},
    include: {
      reservations: {
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const {
    name,
    date,
    time,
    level: eventLevel,
    limit,
    description,
    location,
  } = await request.json();

  try {
    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        time,
        level: eventLevel,
        limit: parseInt(limit, 10), // Convert limit to integer
        description,
        location,
        created_by: parseInt(session.user.id as string),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  await prisma.event.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Event deleted successfully" });
}
