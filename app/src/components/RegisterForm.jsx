import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Phone from "./PhoneInput";
import Skills from "./SkillsInput";
import Education from "./EducationInput";
import Experience from "./ExperienceInput";
import Social from "./SocialInput";
import axios from "../axios";

const RegisterForm = ({ setFormStep }) => {
	const gitHubData = useSelector((state) => state.github);

	const [phone, setPhone] = useState(null);
	const [isPhoneError, setIsPhoneError] = useState(false);
	const [inputSkills, setInputSkills] = useState([{ value: "" }]);
	const [skills, setSkills] = useState([{ value: "" }]);
	const [inputEducation, setInputEducation] = useState([
		{ institute_name: "", year_of_graduation: "", qualification: "", graduation_field: "" },
	]);
	const [education, setEducation] = useState([
		{ institute_name: "", year_of_graduation: "", qualification: "", graduation_field: "" },
	]);
	const [inputExperience, setInputExperience] = useState([
		{ company_name: "", role: "", duration: "", work_description: "" },
	]);
	const [experience, setExperience] = useState([
		{ company_name: "", role: "", duration: "", work_description: "" },
	]);
	const [inputSocial, setInputSocial] = useState([{ app_name: "", link: "" }]);
	const [social, setSocial] = useState([{ app_name: "", link: "" }]);

	const validatePhone = (e) => {
		const validate = /^\d{10}$/;
		if (e !== null && (!validate.test(e) || e.trim() === "")) {
			setIsPhoneError(true);
		} else {
			setIsPhoneError(false);
		}
	};

	useEffect(() => {
		validatePhone(phone);
	}, [phone]);

	useEffect(() => {
		const allEqual = (arr) => arr.every((v) => v === arr[0]);
		if (inputEducation.length === 1 && allEqual(Object.values(inputEducation[0]))) setEducation([]);
		else setEducation([...inputEducation]);
		if (inputExperience.length === 1 && allEqual(Object.values(inputExperience[0])))
			setExperience([]);
		else setExperience([...inputExperience]);
		if (inputSkills.length === 1 && inputSkills[0].value === null) setSkills([]);
		else setSkills([...inputSkills]);
		if (inputSocial.length === 1 && allEqual(Object.values(inputSocial[0]))) setSocial([]);
		else setSocial([...inputSocial]);
	}, [inputEducation, inputExperience, inputSkills, inputSocial]);

	const handleSubmit = () => {
		const handleSkills = () => {
			const skillsArray = [];
			for (let skill of skills) skillsArray.push(skill.value);
			return skillsArray;
		};

		const sendData = async () => {
			try {
				await axios.post("/user", {
					name: gitHubData.name,
					username: gitHubData.username,
					email: gitHubData.email,
					avatar: gitHubData.avatar,
					phone: phone,
					social_links: social,
					education: education,
					experience: experience,
					skills: handleSkills(),
				});
			} catch (err) {
				console.error(err);
			}
		};

		if (phone === null || isPhoneError) {
			setIsPhoneError(true);
			return null;
		}
		sendData();
		setFormStep(2);
	};

	return (
		<form className="space-y-5 md:space-y-9" onSubmit={(e) => e.preventDefault()}>
			<h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center">
				Setting Your Profile
			</h1>
			<div className="space-y-3 md:space-y-5">
				<Phone setPhone={setPhone} isPhoneError={isPhoneError} />
				<Education education={inputEducation} setEducation={setInputEducation} />
				<Experience experience={inputExperience} setExperience={setInputExperience} />
				<Skills skills={inputSkills} setSkills={setInputSkills} />
				<Social social={inputSocial} setSocial={setInputSocial} />
				<button
					onClick={handleSubmit}
					className="w-full md:w-1/2 lg:w-1/3 font-semibold md:text-lg px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
					Submit
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
