const ExperienceInput = ({ experience, setExperience }) => {
	const addExperience = () => {
		const values = [...experience];
		values.push({
			company_name: "",
			role: "",
			duration: "",
			work_description: "",
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

	return (
		<div>
			<label
				htmlFor="experience"
				className="block font-semibold text-gray-600 text-sm lg:text-base">
				Experience
			</label>
			<div className="space-y-2">
				{experience.map((value, index) => {
					return (
						<div key={index} className="flex flex-wrap items-center gap-2">
							<div className="w-full flex items-center flex-shrink-0 gap-2">
								<input
									type="text"
									name="company_name"
									placeholder="Company Name"
									value={value.company_name}
									onChange={(e) => handleExperience(index, e.target.value, "company_name")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="role"
									placeholder="Role"
									value={value.role}
									onChange={(e) => handleExperience(index, e.target.value, "role")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
							</div>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									name="duration"
									placeholder="Duration"
									value={value.duration}
									onChange={(e) => handleExperience(index, e.target.value, "duration")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="work_description"
									placeholder="Work Description"
									value={value.work_description}
									onChange={(e) => handleExperience(index, e.target.value, "work_description")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								{experience.length > 1 && (
									<button
										onClick={() => removeExperience(index)}
										className="font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
										Remove
									</button>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<button
				onClick={() => addExperience()}
				className="mt-2 font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
				Add More
			</button>
		</div>
	);
};

export default ExperienceInput;
