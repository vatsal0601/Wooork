const Profile = ({ UserInfo }) => {
	return (
		<div className="bg-white w-96 flex items-center gap-3 lg:gap-5 p-3 rounded-md shadow-md hover:shadow-lg">
			<img
				src={UserInfo.avatar}
				alt={UserInfo.name}
				className="w-16 lg:w-20 xl:w-28 h-16 lg:h-20 xl:h-28 p-1 border-2 border-blue-600 object-cover flex-shrink-0 rounded-full"
			/>
			<div>
				<h1 className="font-semibold text-lg lg:text-xl xl:text-2xl">{UserInfo.name}</h1>
				{UserInfo.skills && UserInfo.skills.length > 0 && (
					<p className="text-sm lg:text-base xl:text-lg text-gray-600 italic">
						{UserInfo.skills.slice(0, 3).map((element, index) => (
							<span key={index}>
								#{element}
								{index !== UserInfo.skills.length - 1 && ", "}
							</span>
						))}
					</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
