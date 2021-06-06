const Profile = ({ Image }) => {
	return (
		<div className="bg-white w-96 flex items-center gap-3 lg:gap-5 p-3 rounded-md shadow-md hover:shadow-lg">
			<img
				src={Image}
				alt="Image1"
				className="w-16 lg:w-20 xl:w-28 h-16 lg:h-20 xl:h-28 p-1 border-2 border-blue-600 object-cover rounded-full"
			/>
			<div>
				<h1 className="font-semibold text-lg lg:text-xl xl:text-2xl">Name</h1>
				<p className="text-sm lg:text-base xl:text-lg text-gray-600">Frontend Developer</p>
			</div>
		</div>
	);
};

export default Profile;
