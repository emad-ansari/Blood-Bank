import Image from "next/image";
// import { Button } from "@/components/ui/button";
import FeatureCards from "@/components/ui/feature-card";
import ProgressCard from "@/components/ui/progress-card";
import { Mail, MapPinHouse, MoveRight, Phone } from "lucide-react";
import NavBar from "@/components/nav-bar";
import { LearnAboutDonation } from "@/components/learn-about-donation";
import Link from "next/link";

const Home = async () => {

	return (
		<div className="h-screen bg-white ">
			<NavBar />
			<div className="flex flex-row  items-center ">
				<section className="flex-1 pl-12 pr-8 flex-col  items-start justify-center">
					<h1 className="text-[#0b3052] text-4xl font-bold mb-4 ">
						Save Lives with Every Drop
					</h1>
					<div className="w-[60%] mb-8">
						<span className="text-[#788291] text-lg w-full sm:max-w-[75%] leading-relaxed mt-4">
							Join our mission to ensure a stable blood supply for
							those in need. Your donation can make a difference.
						</span>
					</div>
					<Link
						href = "/sign-up"
						className="bg-red-600  hover:bg-red-500 text-white flex flex-row gap-4 items-center px-4 py-2 w-[50%] rounded-full justify-center "
					>
						Donate Now
						<MoveRight strokeWidth={2.5} />
					</Link>
				</section>
				<section className="flex-1  items-center ">
					<Image
						src="/blood-donor.jpg"
						alt="Blood Donor"
						width={500}
						height={300}
					/>
				</section>
			</div>
			
			<div className="flex flex-col items-center mt-8">
				<h1 className="text-[#0b3052] text-3xl font-bold mb-4 ">
					Our Features
				</h1>
				<FeatureCards />
				<LearnAboutDonation /> 
				<div className="flex flex-col items-center mt-8  w-full py-8 bg-[#f8fbfd] ">
					<h1 className="text-[#0b3052] text-3xl font-bold mb-4 ">
						Our Progress
					</h1>
					<ProgressCard />
				</div>
			</div>
			<div className="bg-[#f1f6ff] flex justify-center items-center py-4  gap-[-100px] ">
				<div className="bg-white shadow-lg shadow-slate-600 h-[400px] w-[400px] mt-16 rounded-xl px-4 py-4 flex flex-col items-center gap-8  mr-[-58px] z-10">
					<h1 className="text-[#0b3052] text-3xl font-bold">
						Contact Us
					</h1>
					<div className="flex flex-col gap-3  w-full ">
						<div className="border-[1px] border-[#0b3052] w-full rounded-full px-4 py-2 flex gap-6 items-center cursor-pointer">
							<div className="p-2 rounded-full text-[#0b3052] bg-red-400 ">
								<Phone className="w-4 h-4" />
							</div>
							123-456-7890
						</div>
						<div className="border-[1px] border-[#0b3052] w-full rounded-full px-4 py-2 flex gap-6 items-center cursor-pointer">
							<div className="p-2 rounded-full text-[#0b3052] bg-red-400 ">
								<MapPinHouse className="w-4 h-4" />
							</div>
							123 ANYWHERE ST., ANY CITY
						</div>
						<div className="border-[1px] border-[#0b3052] w-full rounded-full px-4 py-2 flex gap-6 items-center  cursor-pointer">
							<div className="p-2 rounded-full text-[#0b3052] bg-red-400 ">
								<Mail className="w-4 h-4" />
							</div>
							HELLO@REALLYGREATSITE.COM
						</div>
					</div>
				</div>
				<Image
					className="z-0"
					src="/Contact-Us.png"
					alt="Contact Us"
					width={500}
					height={300}
				/>
			</div>
		</div>
	);
};

export default Home;
