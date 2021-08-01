const CollaboratorsInput = ({ collaborator, setCollaborator }) => {
	const addCollaborator = () => {
		const values = [...collaborator];
		values.push({
			username: "",
			name: "",
			role: "",
		});
		setCollaborator(values);
	};

	const removeCollaborator = (index) => {
		const values = [...collaborator];
		values.splice(index, 1);
		setCollaborator(values);
	};

	const handleCollaborator = (index, value, key) => {
		const values = [...collaborator];
		switch (key) {
			case "username":
				values[index].username = value;
				break;
			case "name":
				values[index].name = value;
				break;
			case "role":
				values[index].role = value;
				break;
			default:
				break;
		}
		setCollaborator(values);
	};
	return (
		<div className="space-y-1">
			<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
				Collaborators:{" "}
			</span>
			<div className="space-y-2">
				{collaborator.map((value, index) => {
					return (
						<div key={index} className="flex flex-wrap items-center gap-2">
							<input
								type="text"
								name="username"
								placeholder="Username"
								value={value.username}
								onChange={(e) => handleCollaborator(index, e.target.value, "username")}
								className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
							/>
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={value.name}
								onChange={(e) => handleCollaborator(index, e.target.value, "name")}
								className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
							/>
							<input
								type="text"
								name="role"
								placeholder="Role"
								value={value.role}
								onChange={(e) => handleCollaborator(index, e.target.value, "role")}
								className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
							/>
							{collaborator.length > 1 && (
								<button
									onClick={() => removeCollaborator(index)}
									className="font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
									Remove
								</button>
							)}
						</div>
					);
				})}
			</div>
			<button
				onClick={() => addCollaborator()}
				className="mt-2 font-semibold text-sm md:text-base px-3 py-1 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
				Add More
			</button>
		</div>
	);
};

export default CollaboratorsInput;
