import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// save medical history of donor.

export async function POST(
	req: NextRequest
) {
	try {
        const userId = await auth();
        const { conditions, medications } = await req.json();
        const donorId = req.nextUrl.pathname.split("/").pop();

        if (!userId) {
            return new NextResponse ("UnAuthenticated",  { status: 401 });
        }       

        if (!donorId) {
            return new NextResponse ("Donor Id is required!",  { status: 400 });
        }

        if (!conditions) {
            return new NextResponse ("Medical Conditions are required!",  { status: 400 });
        }
        if (!medications) {
            return new NextResponse ("Medical Medications are required!",  { status: 400 });
        }

        const medicalHistory = await prisma.medicalHistory.create({
            data: {
                conditions,
                medications,
                donorId: donorId
            }
        });
        return NextResponse.json(medicalHistory,  { status: 201 });

	} catch (error) {
		console.error("MEDICAL_HISTORY_POST", error);
        return NextResponse.json(
            { error: "Failed to Create Medical History" },
            { status: 500 }
        );
	}
}



