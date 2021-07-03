const savedReducer = (state = {}, action) => {
	switch (action.type) {
		case "SAVED_DATA":
			return action.payload;
		case "REMOVE_SAVED_DATA":
			return {};
		default:
			return state;
	}
};

export default savedReducer;
