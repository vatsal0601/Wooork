import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Profile from "../components/Profile";

const Home = () => {
	const [skills, setSkills] = useState([]);
	const [cardData, setCardData] = useState([]);
	const [profileData, setProfileData] = useState([]);

	useEffect(() => {
		document.title = "Wooork";

		const fetchData = async () => {
			const reqSkills = await axios.get("/user/skills");
			const reqCardData = await axios.get("/project/random");
			const reqProfileData = await axios.get("/user/random");
			setSkills(reqSkills.data);
			setCardData(reqCardData.data);
			setProfileData(reqProfileData.data);
		};
		fetchData();
	}, []);

	return (
		<>
			<Hero />
			{skills && skills.length > 0 && (
				<div className="container mx-auto px-5 md:px-10 mb-8 lg:mb-12">
					<h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
						Some skills to navigate
					</h1>
					<div className="flex flex-wrap gap-3">
						{skills.slice(0, 15).map((skill, index) => (
							<div
								key={index}
								className="px-3 py-2 text-sm lg:text-base xl:text-lg rounded-full border-2 border-blue-600 font-semibold">
								{skill}
							</div>
						))}
					</div>
				</div>
			)}
			{cardData && cardData.length > 0 && (
				<div className="container mx-auto px-5 md:px-10 mb-8 lg:mb-12">
					<h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">Some recent projects</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
						{cardData.map((card, index) => (
							<Card key={index} CardInfo={card} />
						))}
					</div>
				</div>
			)}
			{profileData && profileData.length > 0 && (
				<div className="container mx-auto px-5 md:px-10 mb-8 lg:mb-12">
					<h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">Some recent profiles</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
						{profileData.map((profile, index) => (
							<Link key={index} to={`/profile/${profile._id}`}>
								<Profile UserInfo={profile} />
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
