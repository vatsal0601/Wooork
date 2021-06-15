import { useEffect } from "react";
import Image from "../images/image1.jfif";

const Project = () => {
	useEffect(() => {
		// Set Project name as title
		document.title = "Project";
	}, []);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 lg:space-y-7">
			<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 text-center my-5">
				Wooork
			</h1>
			<div className="space-y-5 lg:space-y-0 lg:flex items-center gap-7">
				<img src={Image} alt="Image1" className="rounded-md" />
				<div className="space-y-5 lg:space-y-7">
					<ul className="space-y-5">
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Owner Name:{" "}
							</span>
							Vatsal Sakariya
						</li>
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								URL:{" "}
							</span>
							https://github.com/vatsal0601/Wooork/
						</li>
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Collaborators:{" "}
							</span>
							None
						</li>
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Project Status:{" "}
							</span>
							Ongoing
						</li>
					</ul>
				</div>
			</div>
			<p className="lg:text-lg xl:text-xl max-w-prose">
				<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
					Description:{" "}
				</span>
				A platform where people can find projects to work on, find people to work with together for
				projects or freelancing work.
			</p>
			<button className="px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
				Send Collaboration Request
			</button>
		</div>
	);
};

export default Project;
