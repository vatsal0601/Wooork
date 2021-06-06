import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Explore from "./pages/Explore.jsx";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

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
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/profile">
						<Profile />
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
