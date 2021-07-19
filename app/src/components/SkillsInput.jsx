const SkillsInput = ({ skills, setSkills }) => {
	const addSkill = () => {
		const values = [...skills];
		values.push({ value: "" });
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

	return (
		<div>
			<label htmlFor="phone" className="block font-semibold text-gray-600 text-sm lg:text-base">
				Skills
			</label>
			<div className="space-y-2">
				{skills.map((skill, index) => {
					return (
						<div key={index} className="flex items-center gap-2">
							<input
								type="text"
								name="skills"
								placeholder="Skills"
								value={skill.value}
								onChange={(e) => handleSkill(index, e.target.value)}
								className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
							/>
							{skills.length > 1 && (
								<button
									onClick={() => removeSkill(index)}
									className="font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
									Remove
								</button>
							)}
						</div>
					);
				})}
			</div>
			<button
				onClick={() => addSkill()}
				className="mt-2 font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
				Add More
			</button>
		</div>
	);
};

export default SkillsInput;
