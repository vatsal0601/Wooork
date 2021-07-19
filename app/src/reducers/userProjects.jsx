const userProjectReducer = (state = {}, action) => {
	switch (action.type) {
		case "USER_PROJECT":
			return action.payload;
		default:
			return state;
	}
};

export default userProjectReducer;
