import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authorize } from "../actions";

import Image from "../images/user3.jfif";

const Sidebar = ({ isOpen, toggle }) => {
	const isAuthorized = useSelector((state) => state.isAuthorized);
	const dispatch = useDispatch();

	return (
		<nav
			className={
				isOpen
					? "bg-white w-full fixed z-50 inset-0 flex flex-col items-start justify-center gap-5 px-5"
					: "hidden"
			}
			role="navigation">
			<svg
				onClick={toggle}
				className="w-8 h-8 active:text-blue-600 transition-colors absolute right-3 top-3 cursor-pointer"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
			<NavLink to="/">
				<h1 onClick={toggle} className="text-5xl text-blue-600 font-bold">
					Wooork
				</h1>
			</NavLink>
			<ul className="w-full flex flex-col items-start gap-7 font-semibold">
				{isAuthorized && (
					<li className="w-full flex items-center justify-between">
						<NavLink to="/profile" activeClassName="font-bold">
							<div
								onClick={toggle}
								className="text-gray-600 active:text-blue-600 transition-colors flex items-center gap-3">
								<img src={Image} alt="name" className="w-10 h-10 object-cover rounded-full" />
								Vatsal Sakariya
							</div>
						</NavLink>
						<div>
							<button
								onClick={() => {
									toggle();
									dispatch(authorize());
								}}
								className="bg-blue-600 active:bg-transparent border-2 border-blue-600 font-semibold text-white active:text-black px-2 py-1 focus:outline-none transition-colors rounded-md">
								Logout
							</button>
						</div>
					</li>
				)}
				<li
					onClick={toggle}
					className="text-lg text-gray-600 active:text-blue-600 transition-colors">
					<a href="https://github.com/vatsal0601/Wooork">GitHub</a>
				</li>
				<NavLink to="/about" activeClassName="font-bold">
					<li
						onClick={toggle}
						className="text-lg text-gray-600 active:text-blue-600 transition-colors">
						About
					</li>
				</NavLink>
				<NavLink to="/explore" activeClassName="font-bold">
					<li
						onClick={toggle}
						className="text-lg text-gray-600 active:text-blue-600 transition-colors">
						Explore
					</li>
				</NavLink>
				{isAuthorized && (
					<NavLink to="/dashboard" activeClassName="font-bold">
						<li
							onClick={toggle}
							className="text-lg text-gray-600 active:text-blue-600 transition-colors">
							Dashboard
						</li>
					</NavLink>
				)}
				{!isAuthorized && (
					<NavLink to="/login" activeClassName="font-bold">
						<li
							onClick={toggle}
							className="text-lg text-gray-600 active:text-blue-600 transition-colors">
							Login
						</li>
					</NavLink>
				)}
				{!isAuthorized && (
					<NavLink to="/register" activeClassName="font-bold">
						<li
							onClick={toggle}
							className="text-lg text-gray-600 active:text-blue-600 transition-colors">
							Register
						</li>
					</NavLink>
				)}
			</ul>
		</nav>
	);
};

export default Sidebar;
