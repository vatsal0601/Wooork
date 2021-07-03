import authorizedReducer from "./isAuthorized";
import userReducer from "./userData";
import savedReducer from "./savedData";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	isAuthorized: authorizedReducer,
	user: userReducer,
	saved: savedReducer,
});

export default allReducers;
