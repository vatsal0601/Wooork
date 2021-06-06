const Card = ({ Image }) => {
	return (
		<div className="bg-white w-96 h-full rounded-md shadow-md hover:shadow-lg">
			<img src={Image} alt="Image1" className="w-full lg:h-56 xl:h-60 object-cover rounded-t-md" />
			<div className="space-y-3 p-3">
				<h1 className="text-lg lg:text-xl xl:text-2xl text-blue-600 font-semibold">Wooork</h1>
				<p className="text-sm lg:text-base xl:text-lg text-gray-600">
					A platform where people can find projects to work on, find people to work with together
					for projects or freelancing work.
				</p>
			</div>
		</div>
	);
};

export default Card;
