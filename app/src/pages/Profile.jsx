import { useEffect } from "react";
import Image from "../images/user3.jfif";

const Profile = () => {
	useEffect(() => {
		// Set Name as title
		document.title = "Profile";
	}, []);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 md:space-y-0 md:flex items-start justify-center gap-3 lg:gap-10">
			<ul className="space-y-5">
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg">
						Profile Picture:{" "}
					</span>
					<img
						src={Image}
						alt="user"
						className="w-36 lg:w-48 xl:w-52 h-36 lg:h-48 xl:h-52 object-cover rounded-md"
					/>
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Name:{" "}
					</span>
					Vatsal Sakariya
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Username:{" "}
					</span>
					vatsal0601
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Email:{" "}
					</span>
					vsakariya8@gmail.com
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Phone:{" "}
					</span>
					9484695551
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg max-w-prose -mb-1">
						Skills:{" "}
					</span>
					#FrontendDevelopment, #BackendDevelopment, #MachineLearning
				</li>
				<li className="lg:text-lg xl:text-xl text-blue-600">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg max-w-prose -mb-1">
						Social Links:{" "}
					</span>
					Twitter, Instagram, LinkedIn
				</li>
			</ul>
			<ul className="space-y-5">
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Education:{" "}
					</span>
					<ul className="space-y-3">
						<li>
							<p>Institute Name</p>
							<p className="text-gray-600">Qualification in Graduation Field</p>
							<p className="text-sm lg:text-base xl:text-lg text-gray-600">Year of Qualification</p>
						</li>
					</ul>
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Work Experience:{" "}
					</span>
					<ul className="space-y-3">
						<li>
							<p>Company Name</p>
							<p className="text-gray-600">Role for Duration</p>
							<p className="text-sm lg:text-base xl:text-lg text-gray-600">Work Description</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
};

export default Profile;
