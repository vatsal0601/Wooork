import Image from "../images/hero.svg";

const Hero = () => {
	return (
		<div className="container mx-auto px-5 md:px-10 my-28 md:flex items-center justify-between gap-3 lg:gap-10">
			<div className="space-y-3 lg:space-y-5">
				<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
					Find your job and make sure goal!
				</h1>
				<p className="text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-prose">
					A platform where people can find projects to work on, find people to work with together
					for projects or freelancing work.
				</p>
				<button className="px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
					Get Started
				</button>
			</div>
			<img src={Image} alt="Hero" className="mt-8 mx-auto w-96 xl:w-2/5" />
		</div>
	);
};

export default Hero;
