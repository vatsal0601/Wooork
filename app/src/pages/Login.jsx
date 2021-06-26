import { useEffect } from "react";
import { Link } from "react-router-dom";
import GitHub from "../images/github.svg";

const Login = () => {
	useEffect(() => {
		document.title = "Login";
	}, []);

	return (
		<div className="flex items-center justify-center">
			<div className="p-5 mx-5 md:p-10 md:mx-10 my-28 bg-white w-96 space-y-3 rounded-md">
				<div className="space-y-28">
					<h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center">Login</h1>
					<a
						href={`${process.env.REACT_APP_BASE_URL}/auth/github`}
						className="w-full flex items-center justify-center gap-3 md:gap-5 font-semibold md:text-lg px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
						<img src={GitHub} alt="GitHub Logo" className="w-7 md:w-9 h-7 md:h-9" />
						Login with GitHub
					</a>
				</div>
				<p className="text-sm lg:text-base">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-600 hover:underline">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
