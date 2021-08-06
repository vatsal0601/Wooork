import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
import NewProject from "./pages/NewProject.jsx";
import Profile from "./pages/Profile.jsx";
import "./App.css";

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

	const [formStep, setFormStep] = useState(0);

	const location = useLocation();

	return (
		<div className="min-h-screen relative pb-16 bg-gray-100 subpixel-antialiased">
			<Navbar toggle={toggle} />
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<TransitionGroup>
				<CSSTransition timeout={300} classNames="fade" key={location.key}>
					<Switch location={location}>
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
						{isAuthorized && (
							<Route path="/new">
								<NewProject />
							</Route>
						)}
						<Route path="/github/:data">
							<GitHub setFormStep={setFormStep} />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<Register formStep={formStep} setFormStep={setFormStep} />
						</Route>
						<Route path="/">
							<Home />
						</Route>
						<Redirect to="/" />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			<Footer />
		</div>
	);
}

export default App;
