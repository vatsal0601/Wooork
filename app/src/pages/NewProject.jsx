import { useEffect, useState } from "react";
import { CheckIcon, XIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProject } from "../actions/index";
import Image from "../components/Image";
import Collaborators from "../components/CollaboratorsInput";
import Tags from "../components/TagsInput";
import Dropdown from "../components/Dropdown";
import axios from "../axios";

const NewProject = () => {
	useEffect(() => {
		document.title = "New Project";
	}, []);

	const list = ["Yet to start", "Ongoing", "Completed"];

	const [name, setName] = useState(null);
	const [nameError, setNameError] = useState(false);
	const [description, setDescription] = useState(null);
	const [descriptionError, setDescriptionError] = useState(false);
	const [url, setUrl] = useState(null);
	const [urlError, setUrlError] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);
	const [selected, setSelected] = useState(list[0]);
	const [inputCollaborator, setInputCollaborator] = useState([
		{ username: "", name: "", role: "" },
	]);
	const [collaborator, setCollaborator] = useState([{ username: "", name: "", role: "" }]);
	const [inputTag, setInputTag] = useState([{ value: "" }]);
	const [tag, setTag] = useState([{ value: "" }]);

	useEffect(() => {
		if (name !== null && name.length <= 0) setNameError(true);
		else setNameError(false);
	}, [name]);

	useEffect(() => {
		if (description !== null && description.length <= 0) setDescriptionError(true);
		else setDescriptionError(false);
	}, [description]);

	useEffect(() => {
		if (url !== null && url.length <= 0) setUrlError(true);
		else setUrlError(false);
	}, [url]);

	useEffect(() => {
		const allEqual = (arr) => arr.every((v) => v === arr[0]);
		if (inputCollaborator.length === 1 && allEqual(Object.values(inputCollaborator[0])))
			setCollaborator([]);
		else setCollaborator([...inputCollaborator]);
		if (inputTag.length === 1 && inputTag[0].value === "") setTag([]);
		else setTag([...inputTag]);
	}, [inputCollaborator, inputTag]);

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const history = useHistory();

	const handleSubmit = () => {
		if (name === null || nameError) {
			setNameError(true);
			return null;
		}

		if (url === null || urlError) {
			setUrlError(true);
			return null;
		}

		if (description === null || descriptionError) {
			setDescriptionError(true);
			return null;
		}

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

		const sendData = async () => {
			const handleTags = () => {
				const tagsArray = [];
				for (let tagElement of tag) tagsArray.push(tagElement.value);
				return tagsArray;
			};

			try {
				const req = await axios.post("/project", {
					user_id: user._id,
					owner_name: user.name,
					project_name: name,
					description: description,
					url: url,
					tag: handleTags(),
					collaborators: collaborator,
					image: `https://wooork0601.herokuapp.com/images/${user._id}_${file.name}`,
					project_status: selected,
				});

				const reqUserProjectId = await axios.get(`/project/project_id=${user._id}`);

				dispatch(userProject([...reqUserProjectId.data.projectIdArray]));

				history.push(`/project/${req.data._id}`);
			} catch (err) {
				console.error(err);
			}
		};

		sendFile();
		sendData();
	};

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 lg:space-y-7">
			<div>
				<input
					type="text"
					name="name"
					placeholder="Project Name"
					onChange={(e) => setName(e.target.value)}
					className="p-3 w-full block focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
				/>
				{nameError && (
					<p className="inline-flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
						<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Please enter a valid name
					</p>
				)}
			</div>
			<div className="w-max ml-auto space-x-3">
				<Link to="/dashboard" className="focus:outline-none">
					<button className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-red-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-red-600 focus:outline-none">
						<XIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Cancel
					</button>
				</Link>
				<button
					onClick={handleSubmit}
					className="inline-flex items-center gap-1 px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
					<CheckIcon className="w-4 lg:w-5 h-4 lg:h-5" />
					Done
				</button>
			</div>
			<div className="space-y-5 lg:space-y-0 lg:flex items-center gap-7 xl:gap-10">
				<div className="lg:w-3/5">
					<Image fileError={fileError} file={file} setFile={setFile} />
					{fileError && (
						<p className="flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
							<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
							Please upload an Image
						</p>
					)}
				</div>
				<div className="space-y-5 lg:space-y-7 flex-grow">
					<ul className="space-y-5">
						<li className="lg:text-lg xl:text-xl space-y-1">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								URL:{" "}
							</span>
							<input
								type="text"
								name="url"
								placeholder="Project URL"
								onChange={(e) => setUrl(e.target.value)}
								className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
							/>
							{urlError && (
								<p className="inline-flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
									<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
									Please enter a valid URL
								</p>
							)}
						</li>
						<li className="lg:text-lg xl:text-xl">
							<Collaborators
								collaborator={inputCollaborator}
								setCollaborator={setInputCollaborator}
							/>
						</li>
						<li className="lg:text-lg xl:text-xl space-y-1">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Project Status:{" "}
							</span>
							<Dropdown list={list} selected={selected} setSelected={setSelected} />
						</li>
					</ul>
				</div>
			</div>
			<div className="lg:text-lg xl:text-xl space-y-1">
				<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
					Description:{" "}
				</span>
				<textarea
					name="description"
					placeholder="Description"
					rows="5"
					onChange={(e) => setDescription(e.target.value)}
					className="p-3 w-full resize-none focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"></textarea>
				{descriptionError && (
					<p className="inline-flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
						<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
						Please enter a valid description
					</p>
				)}
			</div>
			<Tags tag={inputTag} setTag={setInputTag} />
		</div>
	);
};

export default NewProject;
