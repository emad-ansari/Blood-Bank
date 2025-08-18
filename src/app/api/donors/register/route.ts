import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

// Register new donor
export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth();

		// get the email of the user form clerk over here
		if (!userId) {
			return NextResponse.json(
				{ error: "UnAuthenticated!" },
				{ status: 401 }
			);
		}

		// Retrieve the user object from Clerk
		const user = await clerkClient.users.getUser(userId);

		// Extract the primary email address (if verified)
		const email = user.emailAddresses.find(
			(emailObj) => emailObj.verification?.status === "verified"
		)?.emailAddress;
    
    console.log("this is user email: ", email);
		const {
			firstname,
			lastname,
			phone,
			age,
			state,
			district,
			address,
			pincode,
		} = await req.json();

		// Validate the incoming data
		if (!userId || !email) {
			console.error("Missing required fields:", { userId, email });
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		await prisma.user.create({
			data: {
				clerkId: userId,
				firstname,
				lastname,
				age,
				email,
				role: "USER",
				phone,
				state,
				district,
				address,
				pincode,
			},
		});
		// Create donor in the database
		const donor = await prisma.donor.create({
			data: {
				userId: user.id,
				bloodType: "N/A",
			},
		});

		console.log("Donor created:", donor);
		return NextResponse.json(donor, { status: 201 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{ error: "Failed to register donor" },
			{ status: 500 }
		);
	}
}



export async function GET() {
	try {
		const { userId } = await auth();

		// Validate the incoming data
		console.log("this is user id in auth route before condition: ", userId);
		if (!userId) {
			console.error("User Id is Missing!!");
			return NextResponse.json(
				{ error: "User Id is Missing!!" },
				{ status: 400 }
			);
		}
		console.log("this is user id in auth route : ", userId);
		// Create User in the database
		const user = await prisma.user.findFirst({
			where: {
				clerkId: userId,
			},
		});
		if (!user) {
			console.log("No user found for clerkId:", userId);
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		console.log("User created:", user);
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.log("AUTH_FETCH_USER:", error);
		return NextResponse.json(
			{ error: "Failed to fetch the user info" },
			{ status: 500 }
		);
	}
}
