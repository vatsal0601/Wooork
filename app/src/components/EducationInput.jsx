const EducationInput = ({ education, setEducation }) => {
	const addEducation = () => {
		const values = [...education];
		values.push({
			institute_name: "",
			year_of_graduation: "",
			qualification: "",
			graduation_field: "",
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

	return (
		<div>
			<label htmlFor="education" className="block font-semibold text-gray-600 text-sm lg:text-base">
				Education
			</label>
			<div className="space-y-2">
				{education.map((value, index) => {
					return (
						<div key={index} className="flex flex-wrap items-center gap-2">
							<div className="w-full flex items-center flex-shrink-0 gap-2">
								<input
									type="text"
									name="institute_name"
									placeholder="Institute Name"
									value={value.institute_name}
									onChange={(e) => handleEducation(index, e.target.value, "institute_name")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="graduation_field"
									placeholder="Graduation Field"
									value={value.graduation_field}
									onChange={(e) => handleEducation(index, e.target.value, "graduation_field")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
							</div>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									name="qualification"
									placeholder="Qualification"
									value={value.qualification}
									onChange={(e) => handleEducation(index, e.target.value, "qualification")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="year_of_graduation"
									placeholder="Year of Graduation"
									value={value.year_of_graduation}
									onChange={(e) => handleEducation(index, e.target.value, "year_of_graduation")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								{education.length > 1 && (
									<button
										onClick={() => removeEducation(index)}
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
				onClick={() => addEducation()}
				className="mt-2 font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
				Add More
			</button>
		</div>
	);
};

export default EducationInput;
