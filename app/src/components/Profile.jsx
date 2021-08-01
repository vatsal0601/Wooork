const Profile = ({ UserInfo }) => {
	return (
		<div className="bg-white h-24 lg:h-28 xl:h-32 flex items-center gap-3 lg:gap-5 overflow-hidden rounded-md shadow-md hover:shadow-lg transition-shadow">
			<img
				src={UserInfo.avatar}
				alt={UserInfo.name}
				className="w-24 lg:w-28 xl:w-32 h-full object-cover"
			/>
			<div className="p-3">
				<h1 className="font-semibold text-lg lg:text-xl xl:text-2xl text-blue-600">
					{UserInfo.name}
				</h1>
				{UserInfo.skills && UserInfo.skills.length > 0 && (
					<p className="text-sm lg:text-base xl:text-lg text-gray-600 italic">
						{UserInfo.skills.slice(0, 3).map((element, index) => (
							<span key={index} className="font-light">
								#{element}
								{index !== UserInfo.skills.length - 1 && index !== 2 && ", "}
							</span>
						))}
					</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
