import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userProject } from "../actions";
import { useHistory } from "react-router-dom";
import {
	CheckCircleIcon,
	CheckIcon,
	ExclamationCircleIcon,
	MinusIcon,
	PencilAltIcon,
	XIcon,
} from "@heroicons/react/solid";
import Image from "../components/Image";
import Collaborators from "../components/CollaboratorsInput";
import Tags from "../components/TagsInput";
import Dropdown from "../components/Dropdown";
import axios from "../axios";

const Project = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	const list = ["Yet to start", "Ongoing", "Completed"];

	const [isEditing, setIsEditing] = useState(false);
	const [changeImage, setChangeImage] = useState(false);
	const [url, setUrl] = useState(null);
	const [urlError, setUrlError] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);
	const [inputDescription, setInputDescription] = useState(null);
	const [inputDescriptionError, setInputDescriptionError] = useState(false);
	const [selected, setSelected] = useState(list[0]);
	const [collaborator, setCollaborator] = useState([{ username: "", name: "", role: "" }]);
	const [tag, setTag] = useState([{ value: "" }]);

	const isAuthorized = useSelector((state) => state.isAuthorized);
	const project_id = useSelector((state) => state.project_id);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const createTagsArray = (tags) => {
			const tagsArray = [];
			for (let tag of tags) tagsArray.push({ value: tag });
			return tagsArray;
		};

		const fetchData = async () => {
			try {
				const req = await axios.get(`/project/${id}`);
				setData(req.data);
				document.title = req.data.project_name;
				const list = ["Yet to start", "Ongoing", "Completed"];

				if (req.data.url && req.data.url.length > 0) setUrl(req.data.url);
				if (req.data.collaborators && req.data.collaborators.length > 0)
					setCollaborator(req.data.collaborators);
				if (req.data.project_status) setSelected(list[list.indexOf(req.data.project_status)]);
				if (req.data.description && req.data.description.length > 0)
					setInputDescription(req.data.description);
				if (req.data.tag && req.data.tag.length > 0) setTag(createTagsArray(req.data.tag));
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		if (url !== null && url.length <= 0) setUrlError(true);
		else setUrlError(false);
	}, [url]);

	useEffect(() => {
		if (inputDescription !== null && inputDescription.length <= 0) setInputDescriptionError(true);
		else setInputDescriptionError(false);
	}, [inputDescription]);

	const [request, setRequest] = useState(false);
	const [requestSent, setRequestSent] = useState(false);
	const [description, setDescription] = useState("");

	const sendNotification = () => {
		const send = async () => {
			try {
				await axios.post(`/notification/${data.user_id}`, {
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
				setRequestSent(true);
			} catch (err) {
				console.error(err);
			}
		};
		send();
	};

	const dispatch = useDispatch();

	const history = useHistory();

	const handleDelete = () => {
		const deleteProject = async () => {
			try {
				await axios.delete(`/project/delete=${id}`);
				const reqUserProjectId = await axios.get(`/project/project_id=${user._id}`);
				dispatch(userProject([...reqUserProjectId.data.projectIdArray]));
				history.push("/");
			} catch (err) {
				console.error(err);
			}
		};
		deleteProject();
	};

	const handleSubmit = () => {
		if (url === null || urlError) {
			setUrlError(true);
			return null;
		}

		if (description === null || inputDescriptionError) {
			setInputDescriptionError(true);
			return null;
		}

		const sendData = async () => {
			const handleTags = () => {
				const tagsArray = [];
				for (let tagElement of tag) tagsArray.push(tagElement.value);
				return tagsArray;
			};

			try {
				await axios.patch(`/project/update=${data._id}`, {
					description: description,
					url: url,
					tag: handleTags(),
					collaborators: collaborator,
					image: `${process.env.REACT_APP_BASE_URL}/images/${user._id}_${file.name}`,
					project_status: selected,
				});
			} catch (err) {
				console.error(err);
			}
		};

		sendData();
	};

	const handleFile = () => {
		if (file === null || fileError) {
			setFileError(true);
			return null;
		}

		const sendFile = async () => {
			const data = new FormData();
			data.append("name", `${user._id}_${file.name}`);
			data.append("file", file);

			try {
				await axios.post("/project/upload", data);
			} catch (err) {
				console.error(err);
			}
		};

		if (changeImage) sendFile();
	};

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 lg:space-y-7">
			<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 text-center my-5">
				{data.project_name}
			</h1>
			{isAuthorized && project_id.includes(data._id) && !isEditing && (
				<div className="w-max ml-auto space-x-3">
					<button
						onClick={() => setIsEditing(true)}
						className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
						<PencilAltIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Edit
					</button>
					<button
						onClick={handleDelete}
						className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-red-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-red-600 focus:outline-none">
						<MinusIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Delete Project
					</button>
				</div>
			)}
			{isAuthorized && project_id.includes(data._id) && isEditing && (
				<div className="w-max ml-auto space-x-3">
					<button
						onClick={() => {
							setIsEditing(false);
						}}
						className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-red-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-red-600 focus:outline-none">
						<XIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
						<CheckIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Done
					</button>
				</div>
			)}
			<div className="space-y-5 lg:space-y-0 lg:flex items-center gap-7 xl:gap-10">
				<div className="lg:w-3/5 space-y-3">
					{!changeImage ? (
						<img
							src={data.image}
							alt={data.project_name}
							className="w-full object-cover rounded-md"
						/>
					) : (
						<Image fileError={fileError} file={file} setFile={setFile} />
					)}
					{isAuthorized &&
						project_id.includes(data._id) &&
						(!changeImage ? (
							<button
								onClick={() => setChangeImage(true)}
								className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
								<PencilAltIcon className="w-4 lg:w-5 h-4 lg:h-5" />
								Change Image
							</button>
						) : (
							<div className="space-x-3">
								<button
									onClick={() => {
										setChangeImage(false);
									}}
									className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-red-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-red-600 focus:outline-none">
									<XIcon className="w-4 lg:w-5 h-4 lg:h-5" />
									Cancel
								</button>
								<button
									onClick={handleFile}
									className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
									<CheckIcon className="w-4 lg:w-5 h-4 lg:h-5" />
									Done
								</button>
							</div>
						))}
					{fileError && (
						<p className="flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
							<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
							Please upload an Image
						</p>
					)}
				</div>
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
							{!isEditing ? (
								<a href={data.url}>{data.url}</a>
							) : (
								<input
									type="text"
									name="url"
									placeholder="Project URL"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
							)}
							{urlError && (
								<p className="inline-flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
									<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
									Please enter a valid URL
								</p>
							)}
						</li>
						{!isEditing ? (
							data.collaborators &&
							data.collaborators.length > 0 && (
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
							)
						) : (
							<Collaborators collaborator={collaborator} setCollaborator={setCollaborator} />
						)}
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Project Status:{" "}
							</span>
							{!isEditing ? (
								data.project_status
							) : (
								<Dropdown list={list} selected={selected} setSelected={setSelected} />
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="lg:text-lg xl:text-xl">
				<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
					Description:{" "}
				</span>
				{!isEditing ? (
					<p className="max-w-prose">{data.description}</p>
				) : (
					<textarea
						name="description"
						placeholder="Description"
						rows="5"
						value={inputDescription}
						onChange={(e) => setInputDescription(e.target.value)}
						className="p-3 w-full resize-none focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"></textarea>
				)}
				{inputDescriptionError && (
					<p className="inline-flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
						<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Please enter a valid description
					</p>
				)}
			</div>
			{!isEditing ? (
				data.tag &&
				data.tag.length > 0 && (
					<p className="lg:text-lg xl:text-xl max-w-prose">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
							Tags:{" "}
						</span>
						{data.tag.map((tag, index) => (
							<span key={index} className="italic font-light">
								#{tag}
								{index !== data.tag.length - 1 && ", "}
							</span>
						))}
					</p>
				)
			) : (
				<Tags tag={tag} setTag={setTag} />
			)}
			{isAuthorized && !project_id.includes(data._id) && !requestSent && !request && (
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
						className="w-full md:w-1/2 lg:w-1/3 resize-none p-3 focus:ring-3 ring-blue-600 text-sm lg:text-base border-transparent placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none rounded-md shadow-md focus:shadow-sm"></textarea>

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
