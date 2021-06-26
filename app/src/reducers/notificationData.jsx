const initialState = {
	user_id: null,
	notification: null,
};

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case "NOTIFICATION_DATA":
			return (state = action.payload);
		case "ADD_NOTIFICATION":
			return (state.notification = [...state.notification, action.payload]);
		default:
			return state;
	}
};

export default notificationReducer;
