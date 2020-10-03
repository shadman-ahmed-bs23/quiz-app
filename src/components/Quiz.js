import React, { Component, Fragment } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { Helmet } from "react-helmet";

import questions from "./../questions.json";
import isEmpty from "./../is-empty.js";
class Quiz extends React.Component {
	state = {
		questions,
		currentQuestion: {},
		nextQuestion: {},
		previousQuestion: {},
		answer: "",
		numberOfAnsweredQuestion: 0,
		currentQuestionIndex: 0,
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	};
	componentDidMount() {
		const {
			questions,
			currentQuestion,
			nextQuestion,
			previousQuestion,
		} = this.state;
		this.displayQuestions(
			questions,
			currentQuestion,
			nextQuestion,
			previousQuestion
		);
	}

	displayQuestions = (
		questions = this.state.questions,
		currentQuestion,
		nextQuestion,
		previousQuestion
	) => {
		let { currentQuestionIndex } = this.state;
		if (!isEmpty(this.state.questions)) {
			questions = this.state.questions;
			currentQuestion = questions[currentQuestionIndex];
			nextQuestion = questions[currentQuestionIndex + 1];
			previousQuestion = questions[currentQuestionIndex - 1];
			const answer = currentQuestion.answer;
			this.setState({
				currentQuestion,
				nextQuestion,
				previousQuestion,
				answer,
			});
		}
	};
	render() {
		console.log(questions);
		const { currentQuestion } = this.state;
		console.log(currentQuestion);
		return (
			<Fragment>
				<Helmet>
					<title>Quiz Page</title>{" "}
				</Helmet>
				<div className="container">
					<div className="questions">
						<h5>{currentQuestion.question} </h5>
						<div className="options-container">
							<p className="option">{currentQuestion.optionA}</p>
							<p className="option">{currentQuestion.optionB}</p>
						</div>
						<div className="options-container">
							<p className="option">{currentQuestion.optionC}</p>
							<p className="option">{currentQuestion.optionD}</p>
						</div>

						<div className="button-container mt-3">
							<button className="btn btn-secondary mr-2">Previous</button>
							<button className="btn btn-success mr-2">Next</button>
							<button className="btn btn-danger mr-2">Quit</button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Quiz;
