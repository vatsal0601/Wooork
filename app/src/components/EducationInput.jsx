const EducationInput = ({ education, handleEducation, addEducation, removeEducation }) => {
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
									onChange={(e) => handleEducation(index, e.target.value, "institute_name")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="graduation_field"
									placeholder="Graduation Field"
									onChange={(e) => handleEducation(index, e.target.value, "graduation_field")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
							</div>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									name="qualification"
									placeholder="Qualification"
									onChange={(e) => handleEducation(index, e.target.value, "qualification")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="year_of_graduation"
									placeholder="Year of Graduation"
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
