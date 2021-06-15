const ExperienceInput = ({ experience, handleExperience, addExperience, removeExperience }) => {
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
									onChange={(e) => handleExperience(index, e.target.value, "company_name")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="role"
									placeholder="Role"
									onChange={(e) => handleExperience(index, e.target.value, "role")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
							</div>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									name="duration"
									placeholder="Duration"
									onChange={(e) => handleExperience(index, e.target.value, "duration")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="work_description"
									placeholder="Work Description"
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
