import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LangdingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
	return (
		<Router>
			<div>
				<switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />
				</switch>
			</div>
		</Router>
	);
}

export default App;
