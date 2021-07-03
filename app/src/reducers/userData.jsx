const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "USER_DATA":
			return action.payload;
		case "REMOVE_USER_DATA":
			return {};
		default:
			return state;
	}
};

export default userReducer;
