import { AtSymbolIcon, InboxIcon, PhoneIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
	const user = useSelector((state) => state.user);

	return (
		<div className="flex items-start justify-center gap-3 lg:gap-5">
			<img
				src={user.avatar}
				alt={user.name}
				className="w-36 lg:w-48 xl:w-52 h-36 lg:h-48 xl:h-52 p-1 border-2 border-blue-600 object-cover flex-shrink-0 rounded-full"
			/>
			<div className="space-y-3 lg:space-y-5">
				<div>
					<h1 className="font-semibold text-xl lg:text-2xl xl:text-3xl">{user.name}</h1>
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 flex items-center gap-1">
						<AtSymbolIcon className="w-5 h-5" />
						<a href={user.URL}>{user.username}</a>
					</div>
				</div>
				<div className="space-y-1">
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 flex items-center gap-1">
						<InboxIcon className="w-5 h-5" />
						<a href={`mailto:${user.email}`}>{user.email}</a>
					</div>
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 flex items-center gap-1">
						<PhoneIcon className="w-5 h-5" />
						<a href={`tel:${user.phone}`}>{user.phone}</a>
					</div>
					{user.social_links && user.social_links.length > 0 && (
						<div className="text-sm lg:text-base xl:text-lg text-blue-600">
							{user.social_links.map((social, index) => (
								<a key={index} href={social.link}>
									{social.app_name}
									{index !== user.social_links.length - 1 && ", "}
								</a>
							))}
						</div>
					)}
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 font-semibold max-w-prose">
						{user.skills.map((element, index) => (
							<span key={index}>
								#{element}
								{index !== user.skills.length - 1 && ", "}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardProfile;
