import { NavLink } from "react-router-dom";
import Logo from "../images/logo.svg";

const Navbar = ({ toggle }) => {
	return (
		<header className="bg-white shadow-md">
			<nav
				className="container mx-auto py-3 px-5 md:px-10 flex items-center justify-between"
				role="navigation">
				<NavLink to="/">
					<div className="inline-flex items-center gap-2">
						<img src={Logo} alt="Logo" className="w-6 md:w-8 h-6 md:h-8" />
						<h1 className="text-xl md:text-2xl font-semibold active:text-blue-600">Wooork</h1>
					</div>
				</NavLink>
				<ul className="hidden md:flex gap-5 lg:gap-7 font-semibold">
					<li className="text-gray-600 active:text-blue-600 transition-colors">
						<a href="https://github.com/vatsal0601/Wooork">GitHub</a>
					</li>
					<NavLink to="/about" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">About</li>
					</NavLink>
					<NavLink to="/explore" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">Explore</li>
					</NavLink>
					<NavLink to="/dashboard" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">Dashboard</li>
					</NavLink>
				</ul>
				<ul className="hidden md:flex gap-5 lg:gap-7 font-semibold">
					<NavLink to="/login" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">Login</li>
					</NavLink>
					<NavLink to="/register" activeClassName="font-bold">
						<li className="text-gray-600 active:text-blue-600 transition-colors">Register</li>
					</NavLink>
				</ul>
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
