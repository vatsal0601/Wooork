import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authorize, userData, savedData, gitHubData, userProject } from "../actions/index";
import axios from "../axios";

const Github = ({ setFormStep, setUserGitHubInfo }) => {
	const { data } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = () => {
			let dataArray = data.split(" ");
			return {
				username: dataArray[0],
				URL: decodeURIComponent(dataArray[1]),
				avatar: decodeURIComponent(dataArray[2]),
				name: dataArray[3],
				email: dataArray[4],
			};
		};

		const authorizeUser = (githubInfo, databaseInfo, savedInfo, userProjectId) => {
			dispatch(authorize());
			dispatch(userData({ ...githubInfo, ...databaseInfo }));
			dispatch(savedData(savedInfo));
			dispatch(userProject([...userProjectId.projectIdArray]));
		};

		const fetchData = async () => {
			const githubData = getData();
			dispatch(gitHubData({ ...githubData }));
			try {
				const reqUserData = await axios.get(`/user/username=${githubData.username}`);
				const reqUserSavedData = await axios.get(`/saved/${reqUserData.data._id}`);
				const reqUserProjectId = await axios.get(`/project/project_id=${reqUserData.data._id}`);
				authorizeUser(githubData, reqUserData.data, reqUserSavedData.data, reqUserProjectId.data);
				history.push("/");
			} catch (err) {
				setFormStep(1);
				history.push("/register");
				console.error(err);
			}
		};
		fetchData();
	}, [data, history, dispatch, setFormStep, setUserGitHubInfo]);

	return <h1>GitHub Authentication</h1>;
};

export default Github;
