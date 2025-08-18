import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = authenticateUser(req);
    const { conditions, medications } = await req.json();

    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        conditions,
        medications,
        donor: { connect: { userId: userId } },
      },
    });

    return NextResponse.json(medicalHistory, { status: 201 });
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
