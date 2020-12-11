import React from "react";

//Importing CSS
import "./App.css";

//Importing Components

import Login from "./components/Login";
import Quiz from "./components/Quiz";
import AddQuiz from "./components/AddQuiz";
import Home from "./components/Home";
import QuizInstructions from "./components/QuizInstructions";
import SignUp from "./components/SignUp";
import Result from "./components/Result";

//Importing from react router
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
	return (
		
		//Routes
		<Router basename="/quiz-app">
			<Route path="/" exact component={Home} />
			<Route path="/play/instructions" exact component={QuizInstructions} />
			<Route path="/play/quiz/:id" exact component={Quiz} />
			<Route path="/login" exact component={Login} />
			<Route path="/signup" exact component={SignUp} />
			<Route path="/add-quiz-2" exact component={AddQuiz} />
			<Route path="/results" exact component={Result} />
		</Router>
	);
}

export default App;
