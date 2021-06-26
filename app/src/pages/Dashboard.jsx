import { useEffect, useState } from "react";
import Profile from "../components/DashboardProfile";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";

import User from "../images/user3.jfif";
import Image1 from "../images/image1.jfif";
import Image2 from "../images/image2.jfif";
import Image3 from "../images/image3.jfif";

const Dashboard = () => {
	useEffect(() => {
		document.title = "Dashboard";
	}, []);

	const category = ["Projects", "Saved"];

	const [selected, setSelected] = useState(category[0]);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-7 md:space-y-10">
			<Profile Image={User} />
			<div className="space-y-5 md:space-y-7 mx-auto max-w-max">
				<Dropdown list={category} selected={selected} setSelected={setSelected} />
				<div className="flex flex-wrap justify-center gap-3">
					<Card Image={Image1} />
					<Card Image={Image2} />
					<Card Image={Image3} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
