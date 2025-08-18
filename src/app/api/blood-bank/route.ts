import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateUser } from "@/lib/auth";
import { clerkClient } from '@clerk/nextjs/server'



// Register new Blood bank
export async function POST(req: NextRequest) {
	try {
		
        const client = await clerkClient()

        const newUser = await client.users.createUser({
          emailAddress: ['test@example.com'],
          password: 'password',
        })

		const { blood_bank_details, administrator_details } = await req.json();
        console.log('DETIALS: ',  blood_bank_details, administrator_details);
        const registrationDate  = new Date(blood_bank_details.firstRegistrationDate);
        const startDate = new Date(blood_bank_details.fromDate);
        const endDate = new Date(blood_bank_details.toDate);

        // const 
		// create a new blood bank
        const blood_bank = await prisma.bloodBank.create({
            data: {
                name: blood_bank_details.name,
                email: blood_bank_details.email,
                parentHospitalName: blood_bank_details.parentHospitalName,
                category: blood_bank_details.category,
                contactNo: blood_bank_details.contactNo,
                firstRegistrationDate: registrationDate,
                fromDate: startDate,
                toDate : endDate,
                LicenseNo: blood_bank_details.licenseNo,
                state: blood_bank_details.state,
                district: blood_bank_details.district,
                city: blood_bank_details.city,
            }
        })


		if (!blood_bank) {
		    return NextResponse.json(
		        { error: "Not able to create blood bank" },
		        { status: 400 }
		    );
		}
        
      
        console.log("New staff admin created in clerk database: ", newUser);
        if (!newUser) {
            return NextResponse.json(
		        { error: "Not able to get the email of the user" },
		        { status: 400 }
		    )
        }

        const administrator = await prisma.user.create ({
            data: {
                clerkId: newUser.id,
                firstname: administrator_details.firstname,
                lastname: administrator_details.lastname,
                email: administrator_details.email,
                age: administrator_details.age,
                phone: administrator_details.phone,
                state: administrator_details.state,
                district: administrator_details.district,
                address: administrator_details.address,
                pincode: administrator_details.pincode,
                role: "STAFF_ADMIN",
            }
        })

        if (!administrator){
            return NextResponse.json(
		        { error: "Not able to create administrator" },
		        { status: 400 }
		    );
        } 

      
		return NextResponse.json("Blood Bank created successfully with their staff", { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "An unknown error occurred",
			},
			{ status: 500 }
		);
	}
}
