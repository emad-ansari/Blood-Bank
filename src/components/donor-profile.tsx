"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { MapPin, Pencil } from "lucide-react";
// import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface ProfileDisplayProps {
	firstname: string;
	lastname: string;
	phone: string;
	bloodType: string | null;
	dateOfBirth: string;
	address: string;
	setEditUserInfo: Dispatch<SetStateAction<boolean>>;
}

export const ProfileDisplay: FC<ProfileDisplayProps> = ({
	firstname,
	lastname,
	phone,
	bloodType,
	dateOfBirth,
	address,
	setEditUserInfo,}) => {


	return (
		<div className="grid md:grid-cols-[300px_1fr] gap-6">
			{/* Left Column - Profile Card */}
			<Card className="p-6">
				<div className="flex flex-col items-center text-center">
					<Avatar className="h-32 w-32 mb-4">
						<AvatarImage src="" alt={`${firstname} ${lastname}`} />
						<AvatarFallback className="text-4xl bg-[#072037] text-white">
							{firstname?.[0]}
							{lastname?.[0]}
						</AvatarFallback>
					</Avatar>
					<h4 className="text-xl font-semibold text-[#072037] mb-2">
						{firstname} {lastname}
					</h4>
					<p className="text-lg font-medium text-[#072037] mb-2">
						Blood Type: {bloodType}
					</p>
					<div className="flex items-center text-muted-foreground mb-4">
						<MapPin className="h-4 w-4 mr-1" />
						<span>{address}</span>
					</div>
				</div>
			</Card>

			{/* Right Column - Details */}
			<Card>
				<CardContent className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-semibold text-PRIMARY">
							Personal Information
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setEditUserInfo((prev) => !prev)}
							className="text-[#072037] border-PRIMARY"
						>
							<Pencil className="h-4 w-4 mr-2" />
							Edit
						</Button>
					</div>

					<div className="space-y-4">
						<div className="grid grid-cols-[120px_1fr]">
							<span className="text-muted-foreground">
								Full Name
							</span>
							<span className="font-medium">
								{firstname} {lastname}
							</span>
						</div>

						<div className="grid grid-cols-[120px_1fr]">
							<span className="text-muted-foreground">Phone</span>
							<span className="font-medium">{phone}</span>
						</div>

						<div className="grid grid-cols-[120px_1fr]">
							<span className="text-muted-foreground">
								Blood Type
							</span>
							<span className="font-medium">{bloodType}</span>
						</div>

						<div className="grid grid-cols-[120px_1fr]">
							<span className="text-muted-foreground">
								Birth Date
							</span>
							<span className="font-medium">
								{dateOfBirth}
							</span>
						</div>

						<div className="grid grid-cols-[120px_1fr]">
							<span className="text-muted-foreground">
								Address
							</span>
							<span className="font-medium">{address}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
