const githubReducer = (state = {}, action) => {
	switch (action.type) {
		case "GITHUB_DATA":
			return action.payload;
		default:
			return state;
	}
};

export default githubReducer;
