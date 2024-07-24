import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { event_id } = await request.json();
  const user_id = parseInt(session.user.id as string);

  const event = await prisma.event.findUnique({
    where: { id: event_id },
    include: { reservations: true },
  });

  if (event && event.reservations.length >= event.limit) {
    return NextResponse.json({ error: "Event is full" }, { status: 400 });
  }

  const reservation = await prisma.reservation.create({
    data: { event_id, user_id },
  });

  return NextResponse.json(reservation, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing reservation ID" },
      { status: 400 }
    );
  }

  const reservationToDelete = await prisma.reservation.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (
    reservationToDelete &&
    reservationToDelete.user_id !== parseInt(session.user.id as string) &&
    session.user.role !== "admin"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.reservation.delete({
    where: { id: parseInt(id, 10) },
  });

  return new NextResponse(null, { status: 204 });
}
