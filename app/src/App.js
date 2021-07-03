import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Explore from "./pages/Explore.jsx";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home.jsx";
import GitHub from "./pages/GitHub.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Project from "./pages/Project.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
	const [isOpen, setIsOpen] = useState(false);

	const isAuthorized = useSelector((state) => state.isAuthorized);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const hideMenu = () => {
			if (window.innerWidth > 768 && isOpen) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", hideMenu);

		return () => {
			window.removeEventListener("resize", hideMenu);
		};
	});

	return (
		<div className="min-h-screen relative pb-16 bg-gray-100">
			<Router>
				<Navbar toggle={toggle} />
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/explore">
						<Explore />
					</Route>
					{isAuthorized && (
						<Route path="/dashboard">
							<Dashboard />
						</Route>
					)}
					<Route path="/profile/:id">
						<Profile />
					</Route>
					<Route path="/project/:id">
						<Project />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/github/:data">
						<GitHub />
					</Route>
					<Route path="/">
						<Home />
					</Route>
					<Redirect to="/" />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
