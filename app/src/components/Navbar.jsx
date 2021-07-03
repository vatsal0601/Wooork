import { MenuAlt2Icon, BellIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authorize, removeUserData, removeSavedData } from "../actions";
import Logo from "../images/logo.svg";

const Navbar = ({ toggle }) => {
	const isAuthorized = useSelector((state) => state.isAuthorized);
	const user = useSelector((state) => state.user);
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
						<NavLink to={`/profile/${user._id}`} activeClassName="font-bold">
							<li className="text-gray-600 active:text-blue-600 transition-colors flex items-center gap-1 lg:gap-2">
								<img
									src={user.avatar}
									alt={user.name}
									className="w-10 h-10 object-cover rounded-full"
								/>
								{user.name}
							</li>
						</NavLink>
						<li>
							<button
								onClick={() => {
									dispatch(authorize());
									dispatch(removeUserData());
									dispatch(removeSavedData());
								}}
								className="bg-blue-600 active:bg-transparent border-2 border-blue-600 font-semibold text-white active:text-black px-2 py-1 focus:outline-none transition-colors rounded-md">
								Logout
							</button>
						</li>
						<li>
							<BellIcon className="w-5 h-5 text-gray-600 active:text-blue-600 transition-colors cursor-pointer" />
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

				<div className="flex items-center gap-5 lg:gap-7 md:hidden">
					{isAuthorized && (
						<BellIcon className="w-5 h-5 text-gray-600 active:text-blue-600 transition-colors cursor-pointer" />
					)}
					<MenuAlt2Icon
						onClick={toggle}
						className="w-6 h-6 text-gray-600 active:text-blue-600 transition-colors cursor-pointer"
					/>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
