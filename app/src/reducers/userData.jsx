const initialState = {
	user_id: null,
	name: null,
	username: null,
	url: null,
	avatar: null,
	email: null,
	phone: null,
	skills: null,
	social_links: null,
	education: null,
	experience: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "USER_DATA":
			return (state = action.payload);
		case "DELETE_USER_DATA":
			return (state = initialState);
		default:
			return state;
	}
};

export default userReducer;
