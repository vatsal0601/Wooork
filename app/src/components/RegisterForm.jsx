import { useEffect, useState } from "react";

import Phone from "./PhoneInput";
import Skills from "./SkillsInput";
import Education from "./EducationInput";
import Experience from "./ExperienceInput";
import Social from "./SocialInput";

const RegisterForm = () => {
	// Remember to check for default number
	const [phone, setPhone] = useState("0123456789");
	const [isPhoneError, setIsPhoneError] = useState(false);
	const [skills, setSkills] = useState([{ value: null }]);
	const [education, setEducation] = useState([
		{ institute_name: null, year_of_graduation: null, qualification: null, graduation_field: null },
	]);
	const [experience, setExperience] = useState([
		{ company_name: null, role: null, duration: null, work_description: null },
	]);
	const [social, setSocial] = useState([{ app_name: null, url: null }]);

	const validatePhone = (e) => {
		const validate = /^\d{10}$/;
		if (!validate.test(e) || e.trim() === "") {
			setIsPhoneError(true);
		} else {
			setIsPhoneError(false);
		}
	};

	const addSkill = () => {
		const values = [...skills];
		values.push({ value: null });
		setSkills(values);
	};

	const removeSkill = (index) => {
		const values = [...skills];
		values.splice(index, 1);
		setSkills(values);
	};

	const handleSkill = (index, value) => {
		const values = [...skills];
		values[index].value = value;
		setSkills(values);
	};

	const addEducation = () => {
		const values = [...education];
		values.push({
			institute_name: null,
			year_of_graduation: null,
			qualification: null,
			graduation_field: null,
		});
		setEducation(values);
	};

	const removeEducation = (index) => {
		const values = [...education];
		values.splice(index, 1);
		setEducation(values);
	};

	const handleEducation = (index, value, key) => {
		const values = [...education];
		switch (key) {
			case "institute_name":
				values[index].institute_name = value;
				break;
			case "year_of_graduation":
				values[index].year_of_graduation = value;
				break;
			case "qualification":
				values[index].qualification = value;
				break;
			case "graduation_field":
				values[index].graduation_field = value;
				break;
			default:
				break;
		}
		setEducation(values);
	};

	const addExperience = () => {
		const values = [...experience];
		values.push({
			company_name: null,
			role: null,
			duration: null,
			work_description: null,
		});
		setExperience(values);
	};

	const removeExperience = (index) => {
		const values = [...experience];
		values.splice(index, 1);
		setExperience(values);
	};

	const handleExperience = (index, value, key) => {
		const values = [...experience];
		switch (key) {
			case "company_name":
				values[index].company_name = value;
				break;
			case "role":
				values[index].role = value;
				break;
			case "duration":
				values[index].duration = value;
				break;
			case "work_description":
				values[index].work_description = value;
				break;
			default:
				break;
		}
		setExperience(values);
	};

	const addSocial = () => {
		const values = [...social];
		values.push({
			app_name: null,
			url: null,
		});
		setSocial(values);
	};

	const removeSocial = (index) => {
		const values = [...social];
		values.splice(index, 1);
		setSocial(values);
	};

	const handleSocial = (index, value, key) => {
		const values = [...social];
		switch (key) {
			case "app_name":
				values[index].app_name = value;
				break;
			case "url":
				values[index].url = value;
				break;
			default:
				break;
		}
		setSocial(values);
	};

	useEffect(() => {
		validatePhone(phone);
	}, [phone]);

	return (
		<form className="space-y-5 md:space-y-9" onSubmit={(e) => e.preventDefault()}>
			<h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center">
				Setting Your Profile
			</h1>
			<div className="space-y-3 md:space-y-5">
				<Phone setPhone={setPhone} isPhoneError={isPhoneError} />
				<Education
					education={education}
					handleEducation={handleEducation}
					addEducation={addEducation}
					removeEducation={removeEducation}
				/>
				<Experience
					experience={experience}
					handleExperience={handleExperience}
					addExperience={addExperience}
					removeExperience={removeExperience}
				/>
				<Skills
					skills={skills}
					handleSkill={handleSkill}
					addSkill={addSkill}
					removeSkill={removeSkill}
				/>
				<Social
					social={social}
					handleSocial={handleSocial}
					addSocial={addSocial}
					removeSocial={removeSocial}
				/>
				<button className="w-full md:w-1/2 lg:w-1/3 font-semibold md:text-lg px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
					Submit
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
