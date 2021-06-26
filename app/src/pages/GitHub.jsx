import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authorize } from "../actions/index";
import axios from "../axios";

const Github = () => {
	const [userInfo, setUserInfo] = useState({ info: null });
	const { data } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = () => {
			let dataArray = data.split("  ");
			return {
				username: dataArray[0],
				URL: dataArray[1].replace(/-/g, "/"),
				avatar: dataArray[2].replace(/-/g, "/").replace(/!/g, "?"),
				name: dataArray[3],
				email: dataArray[4],
			};
		};

		const authorizeUser = (githubInfo, databaseInfo) => {
			setUserInfo({ info: { ...githubInfo, ...databaseInfo } });
			dispatch(authorize());
		};

		const fetchData = async () => {
			const userGitHubInfo = getData();
			try {
				let req = await axios.get(`/user/username=${userGitHubInfo.username}`);
				authorizeUser(userGitHubInfo, req.data);
				history.push("/");
			} catch (err) {
				setUserInfo({ info: null });
				history.push("/register");
				console.error(err);
			}
		};
		fetchData();
		return () => {
			setUserInfo({});
		};
	}, [data, history, dispatch]);

	return <h1>{JSON.stringify(userInfo.info)}</h1>;
};

export default Github;
