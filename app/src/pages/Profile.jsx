import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CheckIcon, MinusIcon, PencilAltIcon, XIcon } from "@heroicons/react/solid";
import { authorize, removeUserData, removeSavedData } from "../actions";
import Skills from "../components/SkillsInput";
import Education from "../components/EducationInput";
import Experience from "../components/ExperienceInput";
import Social from "../components/SocialInput";
import axios from "../axios";

const Profile = () => {
	const { id } = useParams();

	const [user, setUser] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState([{ value: "" }]);
	const [education, setEducation] = useState([
		{ institute_name: "", year_of_graduation: "", qualification: "", graduation_field: "" },
	]);
	const [experience, setExperience] = useState([
		{ company_name: "", role: "", duration: "", work_description: "" },
	]);
	const [social, setSocial] = useState([{ app_name: "", link: "" }]);

	const isAuthorized = useSelector((state) => state.isAuthorized);
	const userData = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "Profile";

		const createSkillsArray = (skills) => {
			const skillsArray = [];
			for (let skill of skills) skillsArray.push({ value: skill });
			return skillsArray;
		};

		const fetchData = async () => {
			try {
				const req = await axios.get(`/user/${id}`);
				setUser(req.data);
				if (req.data.skills && req.data.skills.length > 0)
					setSkills([...createSkillsArray(req.data.skills)]);
				if (req.data.education && req.data.education.length > 0) setEducation(req.data.education);
				if (req.data.experience && req.data.experience.length > 0)
					setExperience(req.data.experience);
				if (req.data.social_links && req.data.social_links.length > 0)
					setSocial(req.data.social_links);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [id]);

	const handleSubmit = () => {
		const handleSkills = () => {
			const skillsArray = [];
			for (let skill of skills) skillsArray.push(skill.value);
			return skillsArray;
		};

		const submitData = async () => {
			try {
				const req = await axios.patch(`/user/update=${id}`, {
					social_links: social,
					education: education,
					experience: experience,
					skills: handleSkills(),
				});
				setUser(req.data);
			} catch (err) {
				console.error(err);
			}
		};

		const allEqual = (arr) => arr.every((v) => v === arr[0]);

		if (education.length === 1 && allEqual(Object.values(education[0]))) setEducation([]);
		if (experience.length === 1 && allEqual(Object.values(experience[0]))) setExperience([]);
		if (skills.length === 1 && skills[0].value === null) setSkills([]);
		if (social.length === 1 && allEqual(Object.values(social[0]))) setSocial([]);
		submitData();
		setIsEditing(false);
	};

	const handleDelete = () => {
		const deleteUser = async () => {
			try {
				await axios.delete(`/user/delete=${id}`);
				dispatch(authorize());
				dispatch(removeUserData());
				dispatch(removeSavedData());
			} catch (err) {
				console.error(err);
			}
		};
		deleteUser();
	};

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5">
			{isAuthorized && userData._id === user._id && !isEditing && (
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
						Delete Profile
					</button>
				</div>
			)}
			{isAuthorized && userData._id === user._id && isEditing && (
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
			<div className="space-y-5 md:space-y-0 md:flex items-start justify-center gap-3 lg:gap-10 xl:gap-20">
				<ul className="space-y-5">
					<li className="lg:text-lg xl:text-xl">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg">
							Profile Picture:{" "}
						</span>
						<img
							src={user.avatar}
							alt={user.name}
							className="w-36 lg:w-48 xl:w-52 h-36 lg:h-48 xl:h-52 object-cover rounded-md"
						/>
					</li>
					<li className="lg:text-lg xl:text-xl">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
							Name:{" "}
						</span>
						{user.name}
					</li>
					<li className="lg:text-lg xl:text-xl">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
							Username:{" "}
						</span>
						<a href={`https://github.com/${user.username}`}>{user.username}</a>
					</li>
					{isAuthorized && (
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Email:{" "}
							</span>
							<a href={`mailto:${user.email}`}>{user.email}</a>
						</li>
					)}
					{isAuthorized && (
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Phone:{" "}
							</span>
							<a href={`tel:${user.phone}`}>{user.phone}</a>
						</li>
					)}
					{!isEditing ? (
						user.skills &&
						user.skills.length > 0 && (
							<li className="lg:text-lg xl:text-xl">
								<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg max-w-prose -mb-1">
									Skills:{" "}
								</span>
								{user.skills.map((element, index) => (
									<span key={index}>
										#{element}
										{index !== user.skills.length - 1 && ", "}
									</span>
								))}
							</li>
						)
					) : (
						<Skills skills={skills} setSkills={setSkills} />
					)}
					{!isEditing ? (
						user.social_links &&
						user.social_links.length > 0 && (
							<li className="lg:text-lg xl:text-xl text-blue-600">
								<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg max-w-prose -mb-1">
									Social Links:{" "}
								</span>
								{user.social_links.map((social, index) => (
									<a key={index} href={social.link}>
										{social.app_name}
										{index !== user.social_links.length - 1 && ", "}
									</a>
								))}
							</li>
						)
					) : (
						<Social social={social} setSocial={setSocial} />
					)}
				</ul>
				<ul className="space-y-5">
					{!isEditing ? (
						user.education &&
						user.education.length > 0 && (
							<li className="lg:text-lg xl:text-xl">
								<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
									Education:{" "}
								</span>
								<ul className="space-y-3">
									{user.education.map((field, index) => (
										<li key={index}>
											<p>{field.institute_name}</p>
											<p className="text-gray-600">
												{field.qualification}{" "}
												{field.graduation_field && `in ${field.graduation_field}`}
											</p>
											<p className="text-sm lg:text-base xl:text-lg text-gray-600">
												{field.year_of_graduation}
											</p>
										</li>
									))}
								</ul>
							</li>
						)
					) : (
						<Education education={education} setEducation={setEducation} />
					)}
					{!isEditing ? (
						user.experience &&
						user.experience.length > 0 && (
							<li className="lg:text-lg xl:text-xl">
								<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
									Work Experience:{" "}
								</span>
								<ul className="space-y-3">
									{user.experience.map((field, index) => (
										<li key={index}>
											<p>{field.company_name}</p>
											<p className="text-gray-600">
												{field.role} {field.duration && `for ${field.duration}`}
											</p>
											<p className="text-sm lg:text-base xl:text-lg text-gray-600">
												{field.work_description}
											</p>
										</li>
									))}
								</ul>
							</li>
						)
					) : (
						<Experience experience={experience} setExperience={setExperience} />
					)}
				</ul>
			</div>
		</div>
	);
};

export default Profile;
