import { ArrowNarrowRightIcon, BookmarkIcon } from "@heroicons/react/solid";

const Card = ({ Image }) => {
	return (
		<div className="bg-white w-96 h-full rounded-md shadow-md hover:shadow-lg">
			<img src={Image} alt="Image1" className="w-full lg:h-56 xl:h-60 object-cover rounded-t-md" />
			<div className="space-y-1 lg:space-y-3 p-3">
				<h1 className="text-lg lg:text-xl xl:text-2xl text-blue-600 font-semibold">Wooork</h1>
				<p className="text-sm lg:text-base xl:text-lg text-gray-600">
					A platform where people can find projects to work on, find people to work with together
					for projects or freelancing work.
				</p>
				<div className="flex items-center justify-between">
					<div className="text-gray-800 flex items-center gap-1">
						Read More <ArrowNarrowRightIcon className="w-5 h-5" />
					</div>
					<button className="active:bg-blue-600 transition-colors border-2 border-blue-600 px-2 py-1 rounded-md active:text-white font-semibold flex items-center gap-1 focus:outline-none">
						<BookmarkIcon className="w-5 h-5" />
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
