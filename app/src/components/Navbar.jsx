import { useState, useEffect, useRef } from "react";
import { MenuAlt2Icon, BellIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authorize, removeUserData, removeSavedData } from "../actions";
import axios from "../axios";
import Logo from "../images/logo.svg";

const Navbar = ({ toggle }) => {
	const isAuthorized = useSelector((state) => state.isAuthorized);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [toggleNotification, setToggleNotification] = useState(false);
	const [notificationData, setNotificationData] = useState([]);

	const handleToggleNotification = () => {
		setToggleNotification(!toggleNotification);
	};

	const ref = useRef(null);
	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setToggleNotification(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	useEffect(() => {
		const fetchData = async () => {
			const req = await axios.get(`/notification/${user._id}`);
			setNotificationData(req.data.notification);
		};
		if (toggleNotification) fetchData();
	}, [toggleNotification, user]);

	return (
		<header className="bg-white shadow-md">
			<nav
				ref={ref}
				className="container mx-auto py-3 px-5 md:px-10 flex items-center justify-between relative"
				role="navigation">
				<NavLink to="/">
					<div className="flex items-center gap-2">
						<img src={Logo} alt="Logo" className="w-6 md:w-8 h-6 md:h-8" />
						<h1 className="text-xl lg:text-2xl font-semibold active:text-blue-600 transition-colors">
							Wooork
						</h1>
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
				<div className="flex items-center gap-3 lg:gap-7">
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
					{isAuthorized && (
						<BellIcon
							onClick={handleToggleNotification}
							className="w-5 h-5 text-gray-600 active:text-blue-600 transition-colors cursor-pointer"
						/>
					)}
					<MenuAlt2Icon
						onClick={toggle}
						className="w-6 h-6 text-gray-600 active:text-blue-600 transition-colors md:hidden cursor-pointer"
					/>
				</div>
				{toggleNotification && (
					<div className="absolute top-20 right-3 w-10/12 md:w-96 max-h-96 overflow-auto p-3 text-sm lg:text-base divide-y divide-gray-300 text-gray-600 bg-white shadow-md rounded-md">
						{notificationData && notificationData.length > 0 ? (
							notificationData.map((notification, index) => (
								<p key={index}>
									<span className="font-semibold">{notification.sender_info.name}</span> wants to
									collaborate for project{" "}
									<span className="font-semibold">{notification.project.name}</span>.{" "}
									<span className="italic">{notification.description}</span>
								</p>
							))
						) : (
							<p className="text-center italic">No new notifications</p>
						)}
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
