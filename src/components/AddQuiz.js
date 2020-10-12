import React from "react";
import "./../App.css";
import firebaseAuth from './firebaseAuth';

class AddQuiz extends React.Component {
	state = {visible: false, topicName: ''}

	handleChange = (e) => {
		console.log(e.target.value); 
		this.setState({topicName: e.target.value});
	}
	saveQuizTopic = (e) => {
		e.preventDefault(); 
		console.log("Next Button Clicked"); 
		this.setState({visible: true}); 
		firebaseAuth.db
			.collection("quizzes")
			.add({topicName: this.state.topicName})
			.then((docRef) => {
				console.log(docRef.id); 
				//this.setState({topicName: ''});
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	render() { 
		return (
			<div className="AddQuiz container">
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
				{this.state.visible ? <div>Quiz Form </div> : null}
			</div>
		);
	}
};

export default AddQuiz;
