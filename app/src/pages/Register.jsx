import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/RegisterForm";
import GitHub from "../images/github.svg";

const Register = () => {
	useEffect(() => {
		document.title = "Register";
	}, []);

	const MAX_STEP = 2;
	const [formStep, setFormStep] = useState(0);

	return (
		<div className="flex flex-col items-center justify-center mx-5 md:mx-10 my-28">
			<div className="bg-white w-full sm:w-8/12 md:w-6/12 p-5 space-y-3 rounded-md">
				<p className="text-sm md:text-base text-gray-600 font-light">
					Step {formStep + 1} of {MAX_STEP}
				</p>
				<div className={formStep === 0 ? "block space-y-3" : "hidden"}>
					<div className="flex flex-col gap-10">
						<h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center">Register</h1>
						<a
							href={`${process.env.REACT_APP_BASE_URL}/auth/github`}
							onClick={() => setFormStep((currentFormStep) => currentFormStep + 1)}
							className="w-full md:w-3/4 xl:w-2/5 mx-auto inline-flex items-center justify-center gap-3 md:gap-5 font-semibold md:text-lg px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors border-2 border-blue-600 focus:outline-none">
							<img src={GitHub} alt="GitHub Logo" className="w-7 md:w-9 h-7 md:h-9" />
							Register with GitHub
						</a>
					</div>
					<p className="text-sm lg:text-base text-center">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-600 hover:underline">
							Login here
						</Link>
					</p>
				</div>
				<div className={formStep === 1 ? "" : "hidden"}>
					<Form />
				</div>
			</div>
		</div>
	);
};

export default Register;
