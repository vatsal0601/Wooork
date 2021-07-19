export const authorize = () => {
	return {
		type: "AUTHORIZE",
	};
};

export const userData = (payload) => {
	return {
		type: "USER_DATA",
		payload,
	};
};

export const savedData = (payload) => {
	return {
		type: "SAVED_DATA",
		payload,
	};
};

export const removeUserData = () => {
	return {
		type: "REMOVE_USER_DATA",
	};
};

export const removeSavedData = () => {
	return {
		type: "REMOVE_SAVED_DATA",
	};
};

export const gitHubData = (payload) => {
	return {
		type: "GITHUB_DATA",
		payload,
	};
};

export const userProject = (payload) => {
	return {
		type: "USER_PROJECT",
		payload,
	};
};
