const authorizedReducer = (state = false, action) => {
	switch (action.type) {
		case "AUTHORIZE":
			return !state;
		default:
			return state;
	}
};

export default authorizedReducer;
