import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
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
			try {
				const req = await axios.get(`/project/${project}`);
				cardsArray.push(req.data);
			} catch (err) {
				console.error(err);
			}
		}
		setCards(cardsArray);
	};

	useEffect(() => {
		document.title = "Dashboard";

		const fetchData = async () => {
			let req;
			switch (selected) {
				case "Projects":
					try {
						req = await axios.get(`/project/user_id=${user._id}`);
						setCards(req.data);
					} catch (err) {
						console.error(err);
					}
					break;
				case "Saved":
					try {
						req = await axios.get(`/saved/${user._id}`);
						await getSavedProjects(req.data.project_id);
					} catch (err) {
						console.error(err);
					}
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
				<Link to="/new" className="block">
					<button className="flex ml-auto items-center gap-1 px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
						<PlusIcon className="w-5 lg:w-6 h-5 lg:h-6" />
						Create Project
					</button>
				</Link>
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
