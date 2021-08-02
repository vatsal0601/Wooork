import axios from "axios";

const instance = axios.create({
	baseURL: "https://wooork0601.herokuapp.com/",
});

export default instance;
