import Search from "../components/Search";
import LeftContainer from "../components/ExploreLeftContainer";
import RightContainer from "../components/ExploreRightContainer";
import { useEffect } from "react";

const Explore = () => {
	useEffect(() => {
		document.title = "Explore";
	}, []);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28">
			<Search />
			<div className="flex gap-6 flex-col md:flex-row">
				<LeftContainer />
				<RightContainer />
			</div>
		</div>
	);
};

export default Explore;
