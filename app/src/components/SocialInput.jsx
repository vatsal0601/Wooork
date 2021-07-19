const SocialInput = ({ social, setSocial }) => {
	const addSocial = () => {
		const values = [...social];
		values.push({
			app_name: "",
			link: "",
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
			case "link":
				values[index].link = value;
				break;
			default:
				break;
		}
		setSocial(values);
	};

	return (
		<div>
			<label htmlFor="social" className="block font-semibold text-gray-600 text-sm lg:text-base">
				Social
			</label>
			<div className="space-y-2">
				{social.map((value, index) => {
					return (
						<div key={index} className="flex items-center gap-2">
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									name="app_name"
									placeholder="App Name"
									value={value.app_name}
									onChange={(e) => handleSocial(index, e.target.value, "app_name")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								<input
									type="text"
									name="link"
									placeholder="link"
									value={value.link}
									onChange={(e) => handleSocial(index, e.target.value, "link")}
									className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
								/>
								{social.length > 1 && (
									<button
										onClick={() => removeSocial(index)}
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
				onClick={() => addSocial()}
				className="mt-2 font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
				Add More
			</button>
		</div>
	);
};

export default SocialInput;
