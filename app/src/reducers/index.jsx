import authorizedReducer from "./isAuthorized";
import userReducer from "./userData";
import notificationReducer from "./notificationData";
import savedReducer from "./savedData";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	isAuthorized: authorizedReducer,
	user: userReducer,
	notification: notificationReducer,
	saved: savedReducer,
});

export default allReducers;
