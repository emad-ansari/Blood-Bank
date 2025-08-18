import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = authenticateUser(req);
    const { date, location } = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        location,
        donor: { connect: { userId: userId } },
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = authenticateUser(req);

    const appointments = await prisma.appointment.findMany({
      where: { donor: { userId: userId } },
    });

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
