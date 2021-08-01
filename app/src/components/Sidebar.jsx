import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authorize, removeUserData, removeSavedData } from "../actions";
import { Transition } from "@headlessui/react";

const Sidebar = ({ isOpen, toggle }) => {
	const isAuthorized = useSelector((state) => state.isAuthorized);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	return (
		<Transition
			as={Fragment}
			show={isOpen}
			enter="transform transition duration-150"
			enterFrom="translate-x-full opacity-0"
			enterTo="translate-x-0 opacity-100"
			leave="transform transition duration-150"
			leaveFrom="translate-x-0 opacity-100"
			leaveTo="translate-x-full opacity-0">
			<div
				className="bg-white w-full h-screen fixed z-50 inset-0 flex flex-col items-start justify-center gap-5 px-5"
				role="navigation">
				<XIcon
					onClick={toggle}
					className="w-8 h-8 text-gray-600 active:text-blue-600 transition-colors absolute right-3 top-3 cursor-pointer"
				/>
				<Transition.Child
					as={Fragment}
					enter="transform transition delay-100 duration-150"
					enterFrom="translate-y-full opacity-0"
					enterTo="translate-y-0 opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<NavLink to="/">
						<h1 onClick={toggle} className="text-5xl text-blue-600 font-bold">
							Wooork
						</h1>
					</NavLink>
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transform transition delay-100 duration-150"
					enterFrom="translate-y-full opacity-0"
					enterTo="translate-y-0 opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<ul className="w-full flex flex-col items-start gap-7 font-semibold">
						{isAuthorized && (
							<li className="w-full flex items-center justify-between">
								<NavLink to={`/profile/${user._id}`} activeClassName="font-bold">
									<div
										onClick={toggle}
										className="text-gray-600 active:text-blue-600 transition-colors flex items-center gap-3">
										<img
											src={user.avatar}
											alt={user.name}
											className="w-10 h-10 object-cover rounded-full"
										/>
										{user.name}
									</div>
								</NavLink>
								<div>
									<button
										onClick={() => {
											toggle();
											dispatch(authorize());
											dispatch(removeUserData());
											dispatch(removeSavedData());
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
				</Transition.Child>
			</div>
		</Transition>
	);
};

export default Sidebar;
