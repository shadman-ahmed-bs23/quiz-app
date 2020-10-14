import React from "react";
import "./../App.css";
import 'firebase/firestore'; 
import firebaseAuth from './firebaseAuth';

//Importing Components
import QuizForm from "./QuizForm"; 

class AddQuiz extends React.Component {
	state = {
		visible: false, 
		topicName: '', 
		user: {}
	};
	
	componentDidMount() {
		this.authListener();
	}
	authListener() {
		firebaseAuth.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user: null });
				window.location.assign("/login");
			}
		});
	}
	logout() {
		firebaseAuth.auth().signOut();
	}

	handleChange = (e) => {
		console.log(e.target.value); 
		this.setState({topicName: e.target.value});
	}
	saveQuizTopic = (e) => {
		e.preventDefault(); 
		console.log("Next Button Clicked"); 
		this.setState({visible: true}); 

		let firestore = firebaseAuth.firestore();

		firestore
			.collection("quizzes")
			.doc(this.state.topicName)
			.set({
				topicName: this.state.topicName
			})
			.then(function () {
				console.log("Topic Added");
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	render() { 
		return (
			<div className="AddQuiz container">
				<button className="btn btn-danger logout" onClick={this.logout}>Logout</button>
				<h3 className="text-center mt-5">Add Custom Quiz</h3>
				<div className="form-group">
					<label htmlFor="topicName">Name of the Topic of Quiz</label>
					<input 
						type="text" 
						className="form-control" 
						name="topicName"
						value={this.state.topicName}
						onChange={this.handleChange}/>
				</div>
				<button className="btn btn-primary" onClick={this.saveQuizTopic}>Next</button>
				{this.state.visible ? <QuizForm topicName={this.state.topicName}/> : null}
			</div>
		);
	}
};

export default AddQuiz;
