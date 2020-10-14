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

import firebase from 'firebase'; 
import "firebase/firestore"
import firebaseAuth from './components/firebaseAuth';

//Importing from react router
import { BrowserRouter as Router, Route } from "react-router-dom";

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
		
		
		<Router basename="/quiz-app">
			<Route path="/" exact component={Home} />
			<Route path="/play/instructions" exact component={QuizInstructions} />
			<Route path="/play/quiz" exact render={() => <Quiz questions={"Real Madrid"}/> } />
			<Route path="/login" exact component={Login} />
			<Route path="/signup" exact component={SignUp} />
			<Route path="/add-quiz-2" exact component={AddQuiz} />
		</Router>
	);
}

export default App;
