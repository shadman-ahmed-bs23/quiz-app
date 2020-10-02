import React, { useState } from "react";

//Importing CSS
import "./App.css";

//Importing Components
import Nav from "./components/Nav";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import AddQuiz from "./components/AddQuiz";
import Home from "./components/Home";
import QuizInstructions from "./components/QuizInstructions";

//Importing from react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		/*
		<Router>
			<div className="App">
				<Nav />
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/quiz" component={Quiz} />
					<Route exact path="/add-quiz" component={AddQuiz} />
				</Switch>
			</div>
		</Router>
		*/
		<Router>
			<Route path="/" exact component={Home} />
			<Route path="/play/instructions" exact component={QuizInstructions} />
		</Router>
	);
}

export default App;
