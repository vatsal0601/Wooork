import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import axios from "../axios";

const Project = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			const req = await axios.get(`/project/${id}`);
			setData(req.data);
			document.title = req.data.project_name;
		};
		fetchData();
	}, [id]);

	const [request, setRequest] = useState(false);
	const [requestSent, setRequestSent] = useState(false);
	const [description, setDescription] = useState("");

	const sendNotification = () => {
		const send = async () => {
			try {
				const req = await axios.post(`/notification/${data.user_id}`, {
					user_id: data.user_id,
					notification: [
						{
							project: {
								id: data._id,
								name: data.project_name,
							},
							description: description,
							sender_info: {
								id: user._id,
								name: user.name,
							},
						},
					],
				});
				console.log(req.data);
				setRequestSent(true);
			} catch (err) {
				console.error(err);
			}
		};
		send();
	};

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 lg:space-y-7">
			<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 text-center my-5">
				{data.project_name}
			</h1>
			<div className="space-y-5 lg:space-y-0 lg:flex items-center gap-7 xl:gap-10">
				<img
					src={data.image}
					alt={data.project_name}
					className="lg:w-3/5 object-cover rounded-md"
				/>
				<div className="space-y-5 lg:space-y-7">
					<ul className="space-y-5">
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Owner Name:{" "}
							</span>
							{data.owner_name}
						</li>
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								URL:{" "}
							</span>
							<a href={data.url}>{data.url}</a>
						</li>
						{data.collaborators && data.collaborators.length > 0 && (
							<li className="lg:text-lg xl:text-xl">
								<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
									Collaborators:{" "}
								</span>
								{data.collaborators.map((user, index) => (
									<span key={index}>
										{user.name}({user.role}){index !== data.collaborators.length - 1 && ", "}
									</span>
								))}
							</li>
						)}
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Project Status:{" "}
							</span>
							{data.project_status}
						</li>
					</ul>
				</div>
			</div>
			<p className="lg:text-lg xl:text-xl max-w-prose">
				<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
					Description:{" "}
				</span>
				{data.description}
			</p>
			{!requestSent && !request && (
				<button
					onClick={() => setRequest(true)}
					className="px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
					Send Collaboration Request
				</button>
			)}
			{!requestSent && request && (
				<div className="space-y-3 lg:space-y-5">
					<textarea
						name="description"
						placeholder="Enter your message"
						onChange={(e) => setDescription(e.target.value)}
						rows="5"
						className="w-full md:w-1/2 lg:w-1/3 p-3 focus:ring-3 ring-blue-600 text-sm lg:text-base border-transparent placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none rounded-md shadow-md focus:shadow-sm"></textarea>

					<div className="space-x-3 lg:space-x-5">
						<button
							onClick={() => {
								setDescription("");
								setRequest(false);
							}}
							className="px-5 py-3 rounded-md active:bg-red-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-red-600 focus:outline-none">
							Cancel
						</button>
						<button
							onClick={sendNotification}
							className="px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
							Send Request
						</button>
					</div>
				</div>
			)}
			{requestSent && (
				<div className="w-max flex items-center gap-1 px-5 py-3 text-sm lg:text-base xl:text-lg font-semibold text-green-600 border-2 border-green-600 rounded-md">
					<CheckCircleIcon className="w-5 h-5 text-green-600" />
					Collaboration Request Sent
				</div>
			)}
		</div>
	);
};

export default Project;
