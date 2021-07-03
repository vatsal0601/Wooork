import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authorize, userData, savedData } from "../actions/index";
import axios from "../axios";

const Github = () => {
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

		const authorizeUser = (githubInfo, databaseInfo, savedInfo) => {
			dispatch(authorize());
			dispatch(userData({ ...githubInfo, ...databaseInfo }));
			dispatch(savedData(savedInfo));
		};

		const fetchData = async () => {
			const userGitHubInfo = getData();
			try {
				const reqUserData = await axios.get(`/user/username=${userGitHubInfo.username}`);
				const reqUserSavedData = await axios.get(`/saved/${reqUserData.data._id}`);
				authorizeUser(userGitHubInfo, reqUserData.data, reqUserSavedData.data);
				history.push("/");
			} catch (err) {
				history.push("/register");
				console.error(err);
			}
		};
		fetchData();
	}, [data, history, dispatch]);

	return <h1>GitHub Authentication</h1>;
};

export default Github;
