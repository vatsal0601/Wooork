import Card from "./Card";
import Profile from "./Profile";

import Image1 from "../images/image1.jfif";
import Image2 from "../images/image2.jfif";
import Image3 from "../images/image3.jfif";
import User1 from "../images/user1.jfif";
import User2 from "../images/user2.jfif";
import User3 from "../images/user3.jfif";

const ExploreRightContainer = () => {
	return (
		<div className="flex-grow rounded-md space-y-3">
			<div className="flex flex-wrap justify-center md:justify-start gap-3">
				<Card Image={Image1} />
				<Card Image={Image1} />
				<Card Image={Image2} />
				<Card Image={Image3} />
			</div>
			<div className="flex flex-wrap justify-center md:justify-start gap-3">
				<Profile Image={User1} />
				<Profile Image={User2} />
				<Profile Image={User3} />
				<Profile Image={User3} />
			</div>
		</div>
	);
};

export default ExploreRightContainer;
