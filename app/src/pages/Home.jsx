import Hero from "../components/Hero";
import Card from "../components/Card";
import Profile from "../components/Profile";

import Image1 from "../images/image1.jfif";
import Image2 from "../images/image2.jfif";
import Image3 from "../images/image3.jfif";
import User1 from "../images/user1.jfif";
import User2 from "../images/user2.jfif";
import User3 from "../images/user3.jfif";

const Home = () => {
	return (
		<>
			<Hero />
			<div className="container mx-auto px-5 md:px-10 mb-8 lg:mb-12">
				<h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">Some skills to navigate</h1>
				<div className="flex flex-wrap gap-3">
					<div className="px-3 py-2 text-sm lg:text-base xl:text-lg rounded-full border-2 border-blue-600 font-semibold">
						Frontend Development
					</div>
					<div className="px-3 py-2 text-sm lg:text-base xl:text-lg rounded-full border-2 border-blue-600 font-semibold">
						Backend Development
					</div>
					<div className="px-3 py-2 text-sm lg:text-base xl:text-lg rounded-full border-2 border-blue-600 font-semibold">
						Machine Learning
					</div>
				</div>
			</div>
			<div className="container mx-auto px-5 md:px-10 mb-8 lg:mb-12">
				<h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">Some recent projects</h1>
				<div className="flex flex-wrap gap-3">
					<Card Image={Image1} />
					<Card Image={Image2} />
					<Card Image={Image3} />
				</div>
			</div>
			<div className="container mx-auto px-5 md:px-10 mb-8 lg:mb-12">
				<h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">Some recent profiles</h1>
				<div className="flex flex-wrap gap-3">
					<Profile Image={User1} />
					<Profile Image={User2} />
					<Profile Image={User3} />
				</div>
			</div>
		</>
	);
};

export default Home;
