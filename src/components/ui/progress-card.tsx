"use client";
import { BookPlus, HandHeart } from "lucide-react";
import { useState } from "react";

const ProgressCard = () => {
	// const [donorRegisterd, setDonorRegistered] = useState<number>(1000);
	// const [bloodUnitCollected, setBloodUnitCollected] = useState<number>(1500);

	const progresses = [
		{
			href: "1",
			title: "Donors Registered",
			count: 1000,
			icon: <BookPlus className="w-6 h-6" />,
		},
		{
			href: "2",
			title: "Blood Units Collected",
			count: 1500,
			icon: <HandHeart strokeWidth={2.5} />,
		},
	];

	// useEffect(() => {
	// 	let i = 0;
	// 	let j = 0;

	// 	while (i <= 5899116 || j <= 5897452) {
	// 		if (i <= 5899116) {
	// 			setDonorRegistered(i);
	// 			i++;
	// 		}
	// 		if (j <= 5897452) {
	// 			setBloodUnitCollected(j);
	// 			j++;
	// 		}
	// 	}
	// }, []);
    // console.log(donorRegisterd, bloodUnitCollected);

	return (
		<div className="p-8 ">
			<div className="max-w-3xl mx-auto  grid grid-cols-1 sm:grid-cols-2  gap-6">
				{progresses.map((progress, index) => (
					<div
						key={index}
						className="bg-white shadow-md shadow-slate-400 group relative rounded-2xl  p-6  transition-all duration-300 cursor-pointer"
					>
						<div className="flex flex-col items-center space-y-4">
							<div className="flex justify-center items-center  text-[#0b3052] transition-colors">
								{progress.icon}
							</div>
							<div className="flex items-center">
								<h1 className="text-red-600 text-2xl font-bold  text-center">
									{progress.count}{"+"}
								</h1>
							</div>

							<h3 className="text-xl font-semibold text-[#0b3052] ">
								{progress.title}
							</h3>
						</div>
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-800/5 to-indigo-800/5 opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProgressCard;
