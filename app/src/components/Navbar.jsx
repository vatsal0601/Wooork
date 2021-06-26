import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authorize } from "../actions";
import Logo from "../images/logo.svg";

import Image from "../images/user3.jfif";

const Navbar = ({ toggle }) => {
	const isAuthorized = useSelector((state) => state.isAuthorized);
	const dispatch = useDispatch();

	return (
		<header className="bg-white shadow-md">
			<nav
				className="container mx-auto py-3 px-5 md:px-10 flex items-center justify-between"
				role="navigation">
				<NavLink to="/">
					<div className="flex items-center gap-2">
						<img src={Logo} alt="Logo" className="w-6 md:w-8 h-6 md:h-8" />
						<h1 className="text-xl md:text-2xl font-semibold active:text-blue-600">Wooork</h1>
					</div>
				</NavLink>
				<ul className="hidden md:flex gap-3 lg:gap-7 font-semibold">
					<li className="text-gray-600 active:text-blue-600 transition-colors">
						<a href="https://github.com/vatsal0601/Wooork">GitHub</a>
					</li>
					<NavLink to="/about" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">About</li>
					</NavLink>
					<NavLink to="/explore" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">Explore</li>
					</NavLink>
					{isAuthorized && (
						<NavLink to="/dashboard" activeClassName="font-bold">
							<li className="text-gray-600 active:text-blue-600 transition-colors">Dashboard</li>
						</NavLink>
					)}
				</ul>
				{isAuthorized && (
					<ul className="hidden md:flex items-center gap-3 lg:gap-7 font-semibold">
						<NavLink to="/profile" activeClassName="font-bold">
							<li className="text-gray-600 active:text-blue-600 transition-colors flex items-center gap-1 lg:gap-2">
								<img src={Image} alt="name" className="w-10 h-10 object-cover rounded-full" />
								Vatsal Sakariya
							</li>
						</NavLink>
						<li>
							<button
								onClick={() => dispatch(authorize())}
								className="bg-blue-600 active:bg-transparent border-2 border-blue-600 font-semibold text-white active:text-black px-2 py-1 focus:outline-none transition-colors rounded-md">
								Logout
							</button>
						</li>
					</ul>
				)}
				{!isAuthorized && (
					<ul className="hidden md:flex items-center gap-5 lg:gap-7 font-semibold">
						<NavLink to="/login" activeClassName="font-bold">
							<li className="text-gray-600 active:text-blue-600 transition-colors">Login</li>
						</NavLink>
						<NavLink to="/register" activeClassName="font-bold">
							<li className="text-gray-600 active:text-blue-600 transition-colors">Register</li>
						</NavLink>
					</ul>
				)}
				<svg
					onClick={toggle}
					className="w-6 h-6 active:text-blue-600 transition-colors md:hidden cursor-pointer"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</nav>
		</header>
	);
};

export default Navbar;
