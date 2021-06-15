import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
	return (
		<nav
			className={
				isOpen
					? "bg-white w-full fixed inset-0 flex flex-col items-start justify-center gap-5 px-5 z-auto"
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
			<ul className="flex flex-col items-start gap-7 font-semibold">
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
				<NavLink to="/dashboard" activeClassName="font-bold">
					<li
						onClick={toggle}
						className="text-lg text-gray-600 active:text-blue-600 transition-colors">
						Dashboard
					</li>
				</NavLink>
				<NavLink to="/login" activeClassName="font-bold">
					<li
						onClick={toggle}
						className="text-lg text-gray-600 active:text-blue-600 transition-colors">
						Login
					</li>
				</NavLink>
				<NavLink to="/register" activeClassName="font-bold">
					<li
						onClick={toggle}
						className="text-lg text-gray-600 active:text-blue-600 transition-colors">
						Register
					</li>
				</NavLink>
			</ul>
		</nav>
	);
};

export default Sidebar;
