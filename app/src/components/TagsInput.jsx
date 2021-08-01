const TagsInput = ({ tag, setTag }) => {
	const addTag = () => {
		const values = [...tag];
		values.push({ value: "" });
		setTag(values);
	};

	const removeTag = (index) => {
		const values = [...tag];
		values.splice(index, 1);
		setTag(values);
	};

	const handleTag = (index, value) => {
		const values = [...tag];
		values[index].value = value;
		setTag(values);
	};

	return (
		<div>
			<label htmlFor="phone" className="block font-semibold text-gray-600 text-sm lg:text-base">
				Tags
			</label>
			<div className="space-y-2">
				{tag.map((value, index) => {
					return (
						<div key={index} className="flex items-center gap-2">
							<input
								type="text"
								name="tags"
								placeholder="Tags"
								value={value.value}
								onChange={(e) => handleTag(index, e.target.value)}
								className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
							/>
							{tag.length > 1 && (
								<button
									onClick={() => removeTag(index)}
									className="font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
									Remove
								</button>
							)}
						</div>
					);
				})}
			</div>
			<button
				onClick={() => addTag()}
				className="mt-2 font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
				Add More
			</button>
		</div>
	);
};

export default TagsInput;
