import React from "react";
import "./App.css";

//Importing Components
import Nav from "./components/Nav";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import AddQuiz from "./components/AddQuiz";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<Route exact path="/login" component={Login} />
				<Route exact path="/quiz" component={Quiz} />
				<Route exact path="/add-quiz" component={AddQuiz} />
			</div>
		</Router>
	);
}

export default App;
