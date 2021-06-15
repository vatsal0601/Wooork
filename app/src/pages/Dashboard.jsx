import { useEffect } from "react";
import Profile from "../components/DashboardProfile";
import User from "../images/user3.jfif";

const Dashboard = () => {
	useEffect(() => {
		document.title = "Dashboard";
	}, []);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28">
			<Profile Image={User} />
		</div>
	);
};

export default Dashboard;
