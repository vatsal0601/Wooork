import { Link } from "react-router-dom";
import Card from "./Card";
import Profile from "./Profile";

const ExploreRightContainer = ({ selected, data, search }) => {
	const filterData = () => {
		let filteredArray = [];
		switch (selected) {
			case "Projects":
				filteredArray = data.filter((value) => {
					if (search === "") return value;
					else if (value.project_name.toLowerCase().includes(search.toLowerCase())) return value;
					return null;
				});
				break;
			case "Profiles":
				filteredArray = data.filter((value) => {
					if (search === "") return value;
					else if (value.name.toLowerCase().includes(search.toLowerCase())) return value;
					return null;
				});
				break;
			default:
				break;
		}
		return filteredArray;
	};

	return (
		<div className="flex-grow rounded-md space-y-3">
			{selected === "Projects" &&
				(data && data.length > 0 ? (
					<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
						{filterData().length > 0 ? (
							filterData().map((element, index) => <Card key={index} CardInfo={element} />)
						) : (
							<p className="lg:text-lg italic">No projects to display</p>
						)}
					</div>
				) : (
					<p className="lg:text-lg italic">No projects to display</p>
				))}
			{selected === "Profiles" &&
				(data && data.length > 0 ? (
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
						{filterData().length > 0 ? (
							filterData().map((element, index) => (
								<Link key={index} to={`profile/${element._id}`} aria-label={element.name}>
									<Profile UserInfo={element} />
								</Link>
							))
						) : (
							<p className="lg:text-lg italic">No profiles to display</p>
						)}
					</div>
				) : (
					<p className="lg:text-lg italic">No profiles to display</p>
				))}
		</div>
	);
};

export default ExploreRightContainer;
