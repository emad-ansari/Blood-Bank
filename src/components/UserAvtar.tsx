import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const UserAvtar = async () => {

	const { userId } = await auth();
	console.log("USER ID: " ,userId);
	if (!userId) {
		redirect("/sign-in");
	}
	
	const user = await prisma.user.findFirst({
		where: {
			clerkId: userId,
		},
	});
	console.log("THIS IS USER: " ,user);

	if (!user) {
		redirect("/");
	}


	return (
		<div className="flex space-x-8 items-center">
			<Link
				href={
					user && user.role === "Donor "
						? "/dashboard/donor/profile"
						: "/blood_bank_dashboard"
				}
				className="text-md font-medium text-[#072037] hover:text-red-500"
			>
				Dashboard
			</Link>
			<UserButton />
		</div>
	);
};
