import { ArrowNarrowRightIcon, BookmarkIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savedData } from "../actions";
import axios from "../axios";

const Card = ({ CardInfo }) => {
	const isAuthorized = useSelector((state) => state.isAuthorized);
	const saved = useSelector((state) => state.saved);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const renderSaveButton = () => {
		return !saved.project_id || !saved.project_id.includes(CardInfo._id) ? (
			<button
				onClick={addToSaved}
				className="active:bg-blue-600 transition-colors border-2 border-blue-600 px-2 py-1 rounded-md active:text-white font-semibold flex items-center gap-1 focus:outline-none">
				<BookmarkIcon className="w-5 h-5" />
				Save
			</button>
		) : (
			<button
				onClick={removeFromSaved}
				className="bg-blue-600 active:bg-transparent transition-colors border-2 border-blue-600 px-2 py-1 rounded-md text-white active:text-black font-semibold flex items-center gap-1 focus:outline-none">
				<BookmarkIcon className="w-5 h-5" />
				Saved
			</button>
		);
	};

	const addToSaved = async () => {
		try {
			await axios.post(`/saved/${user._id}`, {
				user_id: user._id,
				project_id: CardInfo._id,
			});
			const req = await axios.get(`/saved/${user._id}`);
			dispatch(savedData(req.data));
			renderSaveButton();
		} catch (err) {
			console.log(err);
		}
	};

	const removeFromSaved = async () => {
		try {
			await axios.post(`/saved/remove=${user._id}`, {
				user_id: user._id,
				project_id: CardInfo._id,
			});
			const req = await axios.get(`/saved/${user._id}`);
			dispatch(savedData(req.data));
			renderSaveButton();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="bg-white h-full overflow-hidden rounded-md shadow-md hover:shadow-lg transition-shadow">
			<img src={CardInfo.image} alt={CardInfo.project_name} className="w-full object-cover" />
			<div className="space-y-1 lg:space-y-3 p-3">
				<div className="-space-y-1">
					<h1 className="text-lg lg:text-xl xl:text-2xl text-blue-600 font-semibold">
						{CardInfo.project_name}
					</h1>
					<p className="text-xs lg:text-sm xl:text-base text-gray-400">by {CardInfo.owner_name}</p>
				</div>
				<p className="text-sm lg:text-base xl:text-lg text-gray-600 line-clamp-3">
					{CardInfo.description}
				</p>
				<div className="flex items-center justify-between">
					<Link to={`/project/${CardInfo._id}`}>
						<div className="text-gray-800 active:text-blue-600 transition-colors flex items-end gap-1">
							Read More <ArrowNarrowRightIcon className="w-5 h-5" />
						</div>
					</Link>
					{isAuthorized && renderSaveButton()}
				</div>
			</div>
		</div>
	);
};

export default Card;
