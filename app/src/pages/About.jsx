import { useEffect } from "react";
import Image from "../images/about.svg";

const About = () => {
	useEffect(() => {
		document.title = "About";
	}, []);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 md:flex items-center justify-between gap-3 lg:gap-10">
			<div className="space-y-5 lg:space-y-7">
				<div className="space-y-1 lg:space-y-3">
					<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">Wooork</h1>
					<p className="text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-prose">
						A platform where people can find projects to work on, find people to work with together
						for projects or freelancing work.
					</p>
				</div>
				<div className="space-y-1 lg:space-y-3">
					<h2 className="text-xl lg:text-2xl xl:text-3xl font-bold">How it started?</h2>
					<p className="lg:text-base xl:text-xl text-gray-600 max-w-prose">
						The project idea was initially found at a hackathon called HackNUThon by{" "}
						<a
							href="https://www.instagram.com/vatsal_sakariya/"
							className="text-blue-600 hover:underline">
							me
						</a>{" "}
						and my friends{" "}
						<a
							href="https://www.instagram.com/ds._.1101/"
							className="text-blue-600 hover:underline">
							Darshan
						</a>
						,{" "}
						<a
							href="https://www.instagram.com/jainish_savalia/"
							className="text-blue-600 hover:underline">
							Jainish
						</a>{" "}
						and{" "}
						<a
							href="https://www.instagram.com/janmejay.16/"
							className="text-blue-600 hover:underline">
							Janmejay
						</a>{" "}
						but due to time constraint we were not able to complete the project. During the
						hackathon the project idea was built and after the hackathon ended I started building
						this project.
					</p>
					<p className="lg:text-base xl:text-xl text-gray-600 max-w-prose">
						Frontend for this project is built with React, React-Router, Redux, Axios and
						TailwindCSS. Backend is build with NodeJS and MongoDB as the database.
					</p>
				</div>
			</div>
			<img src={Image} alt="About" className="mt-8 mx-auto w-96 xl:w-2/5" />
		</div>
	);
};

export default About;
