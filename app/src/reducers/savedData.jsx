const initialState = {
	user_id: null,
	project_id: null,
};

const savedReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SAVED_DATA":
			return (state = action.payload);
		case "ADD_PROJECT":
			return (state.project_id = [...state.project_id, action.payload]);
		case "REMOVE_PROJECT":
			return (state.project_id = state.project_id.filter((element) => element !== action.payload));
		default:
			return state;
	}
};

export default savedReducer;
