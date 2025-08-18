"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export interface UserDetials {
	firstname: string;
	lastname: string;
	phone: string;
	DateOfBirth: string;
	role: string;
	address: string;
}

const SignUpForm = () => {
	const router = useRouter();
	// const[isStaff, setIsStaff] =

	const [formData, setFormData] = useState<UserDetials>({
		firstname: "",
		lastname: "",
		phone: "",
		DateOfBirth: "",
		role: "",
		address: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleRoleChange = (value: string) => {
		setFormData((prevState) => ({
			...prevState,
			role: value,
		}));
	};

	const savePersonalInfo = async () => {
		console.log("Form submitted:", formData);
		try {
			const res = await axios.post(`/api/auth`, formData);
			if (res.status === 201) {
				router.push("/");
			}
			console.log("this is user signup response : ", res.data);
		} catch (error) {
			console.log("this is error: ", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-4xl mx-auto ">
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* First Name */}
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									name="firstname"
									placeholder="Enter your first name"
									value={formData.firstname}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Last Name */}
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									name="lastname"
									placeholder="Enter your last name"
									value={formData.lastname}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Phone */}
							<div className="space-y-2">
								<Label htmlFor="phone">Phone</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									placeholder="Enter your phone number"
									value={formData.phone}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Date of Birth */}
							<div className="space-y-2">
								<Label htmlFor="dateOfBirth">
									Date of Birth
								</Label>
								<Input
									id="dateOfBirth"
									name="DateOfBirth"
									type="date"
									value={formData.DateOfBirth}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Role Selection */}
							<div className="space-y-2">
								<Label htmlFor="role">Role</Label>
								<Select
									onValueChange={handleRoleChange}
									value={formData.role}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="donor">
											Donor
										</SelectItem>
										<SelectItem value="staff">
											Staff
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							{formData.role === "staff" && (
								<div className="space-y-2">
									<Label htmlFor="bloodBankName">Blood Bank</Label>
									<Input
										id="bloodBankName"
										name="bloodBankName"
										placeholder="Enter Your Blood Bank Name"
										value={formData.address}
										onChange={handleChange}
										required
									/>
								</div>
							)}
							<div className="space-y-2">
								<Label htmlFor="address">Address</Label>
								<Input
									id="address"
									name="address"
									placeholder="Address"
									value={formData.address}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<Button
							className="w-full sm:w-auto"
							onClick={() => savePersonalInfo()}
						>
							Save Changes
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUpForm;
