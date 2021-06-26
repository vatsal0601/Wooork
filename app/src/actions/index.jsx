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

export const deleteUserData = () => {
	return {
		type: "DELETE_USER_DATA",
	};
};

export const notificationData = (payload) => {
	return {
		type: "NOTIFICATION_DATA",
		payload,
	};
};

export const addNotification = (payload) => {
	return {
		type: "ADD_NOTIFICATION",
		payload,
	};
};

export const savedData = (payload) => {
	return {
		type: "SAVED_DATA",
		payload,
	};
};

export const addProject = (payload) => {
	return {
		type: "ADD_PROJECT",
		payload,
	};
};

export const removeProject = (payload) => {
	return {
		type: "REMOVE_PROJECT",
		payload,
	};
};
