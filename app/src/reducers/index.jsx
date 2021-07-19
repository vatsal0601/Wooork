import authorizedReducer from "./isAuthorized";
import userReducer from "./userData";
import savedReducer from "./savedData";
import githubReducer from "./githubData";
import userProjectReducer from "./userProjects";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	isAuthorized: authorizedReducer,
	user: userReducer,
	saved: savedReducer,
	github: githubReducer,
	project_id: userProjectReducer,
});

export default allReducers;
