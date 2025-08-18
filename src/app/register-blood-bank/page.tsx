"use client";

import { useState } from "react";

import { STATES, STATE_DISTRICTS, BloodBankInfo } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function RegisterBloodBank() {
	const [loading, setLoading] = useState<boolean>(false);

	const [formData, setFormData] = useState<BloodBankInfo>({
		blood_bank_details: {
			name: "",
			parentHospitalName: "",
			category: "",
			contactNo: "",
			email: "",
			firstRegistrationDate: "",
			licenseNo: "",
			fromDate: "",
			toDate: "",
			state: "",
			district: "",
			city: "",
		},
		administrator_details: {
			firstname: "",
			lastname: "",
			age: "",
			email: "",
			phone: "",
			state: "",
			district: "",
			address: "",
			pincode: "",
		},
	});

	console.log("this is form data: ", formData);
	const handleBloodBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => {
			return {
				...prevState,
				blood_bank_details: {
					...prevState.blood_bank_details,
					[name]: value,
				},
			};
		});
	};

	const handleAdministratorChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => {
			return {
				...prevState,
				administrator_details: {
					...prevState.administrator_details,
					[name]: value,
				},
			};
		});
	};

	const handleDistrictChange = (name: string, value: String) => {
		if (name === "blood_bank") {
			setFormData((prev) => {
				return {
					...prev,
					blood_bank_details: {
						...prev.blood_bank_details,
						district: value,
					},
				};
			});
		} else if (name === "administrator") {
			setFormData((prev) => {
				return {
					...prev,
					administrator_details: {
						...prev.administrator_details,
						district: value,
					},
				};
			});
		}
	};

	const handleStateChange = (name: string, value: string) => {
		if (name === "blood_bank") {
			setFormData((prevState) => {
				return {
					...prevState,
					blood_bank_details: {
						...prevState.blood_bank_details,
						state: value,
					},
				};
			});
		}
		if (name === "administator") {
			setFormData((prevState) => {
				return {
					...prevState,
					administrator_details: {
						...prevState.administrator_details,
						state: value,
					},
				};
			});
		}
	};

	const handleCategoryChange = (value: string) => {
		setFormData((prevState) => {
			return {
				...prevState,
				blood_bank_details: {
					...prevState.blood_bank_details,
					category: value,
				},
			};
		});
	};

	const createBloodBank = async () => {
		setLoading(true);
		try {
			const response = await axios.post("/api/blood-bank", {
				blood_bank_details: formData.blood_bank_details,
				administrator_details: formData.administrator_details,
			});
			if (response.status === 201) {
				setLoading(false);
				// display success toast
				// and redirect user on home page
				redirect("/");
			}
			else {
				setLoading(false);
				// display error toast
			}
		} catch (error) {
			console.log(
				"Error occurred during register new blood bank: ",
				error
			);
			setLoading(false);
		}
	};
	return (
		<div className="container mx-auto py-6 max-w-7xl">
			<h1 className="text-2xl font-bold text-PRIMARY mb-6">
				Blood Bank Details
			</h1>
			<div className="space-y-6">
				<Card>
					<CardContent className="p-6">
						<h2 className="text-xl font-semibold mb-6">
							Blood Bank Address
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-2">
								<Label htmlFor="state">
									State
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Select
									required
									onValueChange={(value) =>
										handleStateChange("blood_bank", value)
									}
									value={formData.blood_bank_details.state}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select State" />
									</SelectTrigger>
									<SelectContent>
										{STATES.map((state, i) => (
											<SelectItem key={i} value={state}>
												{state}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="district">
									District
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Select
									required
									onValueChange={(value) =>
										handleDistrictChange(
											"blood_bank",
											value
										)
									}
									value={formData.blood_bank_details.district}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select District" />
									</SelectTrigger>
									<SelectContent>
										{formData.blood_bank_details.state !==
											"" &&
											STATE_DISTRICTS[
												formData.blood_bank_details
													.state
											].map((district) => (
												<SelectItem
													key={district}
													value={district}
												>
													{district}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									name="city"
									placeholder="Enter city name"
									value={formData.blood_bank_details.city}
									onChange={handleBloodBankChange}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<h2 className="text-xl font-semibold mb-6">
							Blood Bank Details
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-2">
								<Label htmlFor="bloodBankName">
									Blood Bank Name
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="bloodBankName"
									required
									name="name"
									value={formData.blood_bank_details.name}
									onChange={handleBloodBankChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="parentHospital">
									Parent Hospital Name
								</Label>
								<Input
									id="parentHospital"
									name="parentHospitalName"
									value={
										formData.blood_bank_details
											.parentHospitalName
									}
									onChange={handleBloodBankChange}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="category">
									Category
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Select
									required
									value={formData.blood_bank_details.category}
									onValueChange={handleCategoryChange}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Government">
											Government
										</SelectItem>
										<SelectItem value="Private">
											Private
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									value={formData.blood_bank_details.email}
									onChange={handleBloodBankChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="contactNo">
									Contact No.
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="contactNo"
									required
									name="contactNo"
									// placeholder="dfdf"
									value={
										formData.blood_bank_details.contactNo
									}
									onChange={handleBloodBankChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="registrationDate">
									First Registration Date
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="registrationDate"
									type="date"
									required
									name="firstRegistrationDate"
									value={
										formData.blood_bank_details
											.firstRegistrationDate
									}
									onChange={handleBloodBankChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="licenseNo">License No.</Label>
								<Input
									id="licenseNo"
									name="licenseNo"
									value={
										formData.blood_bank_details.licenseNo
									}
									onChange={handleBloodBankChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="fromDate">From Date</Label>
								<Input
									id="fromDate"
									type="date"
									name="fromDate"
									value={formData.blood_bank_details.fromDate}
									onChange={handleBloodBankChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="toDate">To Date</Label>
								<Input
									id="toDate"
									type="date"
									name="toDate"
									value={formData.blood_bank_details.toDate}
									onChange={handleBloodBankChange}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<h2 className="text-xl font-semibold mb-6">
							Administrator Details
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-2">
								<Label htmlFor="firstname">
									First Name
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="firstname"
									name="firstname"
									placeholder="First Name"
									value={
										formData.administrator_details.firstname
									}
									onChange={handleAdministratorChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastname">
									Last Name
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="lastname"
									name="lastname"
									placeholder="Last Name"
									value={
										formData.administrator_details.lastname
									}
									onChange={handleAdministratorChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="age">
									Age
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="age"
									name="age"
									placeholder="Age"
									value={formData.administrator_details.age}
									onChange={handleAdministratorChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">
									Email
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="email"
									name="email"
									placeholder=" Email"
									value={formData.administrator_details.email}
									onChange={handleAdministratorChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">
									Mobile
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="phone"
									name="phone"
									placeholder="Phone"
									value={formData.administrator_details.phone}
									onChange={handleAdministratorChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="state">
									State
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Select
									required
									value={formData.administrator_details.state}
									onValueChange={(value) =>
										handleStateChange("administator", value)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select State" />
									</SelectTrigger>
									<SelectContent>
										{STATES.map((state) => (
											<SelectItem
												key={state}
												value={state}
											>
												{state}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="district">
									District
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Select
									required
									value={
										formData.administrator_details.district
									}
									onValueChange={(value) =>
										handleDistrictChange(
											"administrator",
											value
										)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select District" />
									</SelectTrigger>
									<SelectContent>
										{formData.administrator_details
											.state !== "" &&
											STATE_DISTRICTS[
												formData.administrator_details
													.state
											].map((district) => (
												<SelectItem
													key={district}
													value={district}
												>
													{district}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="address">Address</Label>
								<Input
									id="address"
									name="address"
									placeholder="Enter your Address"
									value={
										formData.administrator_details.address
									}
									onChange={handleAdministratorChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="pincode">
									Pincode
									<span className="text-[#C41E3A]">*</span>
								</Label>
								<Input
									id="pincode"
									name="pincode"
									placeholder="Enter your Pincode"
									value={
										formData.administrator_details.pincode
									}
									onChange={handleAdministratorChange}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex justify-end gap-4 mt-6">
				<Button
					variant={"outline"}
					// onClick={() => createBloodBank()}
				>
					Cancel
				</Button>
				<Button
					className="bg-PRIMARY"
					onClick={() => createBloodBank()}
				>
					{loading && <Loader className="animate-spin" />}
					Create
				</Button>
			</div>
		</div>
	);
}
