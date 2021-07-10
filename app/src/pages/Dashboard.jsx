import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../components/DashboardProfile";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";
import axios from "../axios";

const Dashboard = () => {
	const user = useSelector((state) => state.user);
	const category = ["Projects", "Saved"];
	const [cards, setCards] = useState([]);
	const [selected, setSelected] = useState(category[0]);

	const getSavedProjects = async (savedArray) => {
		const cardsArray = [];
		for (let project of savedArray) {
			const req = await axios.get(`/project/${project}`);
			cardsArray.push(req.data);
		}
		setCards(cardsArray);
	};

	useEffect(() => {
		document.title = "Dashboard";

		const fetchData = async () => {
			let req;
			switch (selected) {
				case "Projects":
					req = await axios.get(`/project/user_id=${user._id}`);
					setCards(req.data);
					break;
				case "Saved":
					req = await axios.get(`/saved/${user._id}`);
					await getSavedProjects(req.data.project_id);
					break;
				default:
					break;
			}
		};
		fetchData();
	}, [selected, user._id]);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-7 md:space-y-10">
			<Profile />
			<div className="space-y-5 md:space-y-7 mx-auto max-w-max">
				<Dropdown list={category} selected={selected} setSelected={setSelected} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
					{cards && cards.length > 0 ? (
						cards.map((card, index) => <Card key={index} CardInfo={card} />)
					) : (
						<p className="text-center lg:text-lg italic">No projects to display</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
