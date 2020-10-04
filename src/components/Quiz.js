import React, { Component, Fragment } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { Helmet } from "react-helmet";

import questions from "./../questions.json";
import isEmpty from "./../is-empty.js";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

	handleOptionClick = (e) => {
		if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
			this.correctAnswer();
		} else {
			this.wrongAnswer();
		}
	};
	showAlert = () => {
		const MySwal = withReactContent(Swal);

		//return MySwal.fire(<p>Shorthand works too</p>);
		return MySwal.fire({
			icon: "success",
			title: "Answer Taken",
			confirmButtonText: "Sure",
		});
	};
	correctAnswer = () => {
		const MySwal = withReactContent(Swal);
		//return MySwal.fire(<p>Shorthand works too</p>);
		MySwal.fire({
			icon: "success",
			title: "Answer is Correct",
			confirmButtonText: "Okay",
		});
		this.setState(
			(prevState) => ({
				score: prevState.score + 1,
				correctAnswers: prevState.correctAnswer + 1,
				currentQuestionIndex: prevState.currentQuestionIndex + 1,
				numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1,
			}),
			() => {
				if (this.state.nextQuestion === undefined) {
					this.endQuiz();
				} else {
					this.displayQuestions(
						this.state.questions,
						this.state.currentQuestionIndex,
						this.nextQuestion,
						this.previousQuestion
					);
				}
			}
		);
	};
	wrongAnswer = () => {
		const MySwal = withReactContent(Swal);
		MySwal.fire({
			icon: "error",
			title: "Answer is Incorrect",
			confirmButtonText: "Try Next",
		});
		this.setState(
			(prevState) => ({
				wrongAnswers: prevState.wrongAnswers + 1,
				currentQuestionIndex: prevState.currentQuestionIndex + 1,
				numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1,
			}),
			() => {
				if (this.state.nextQuestion === undefined) {
					this.endQuiz();
				} else {
					this.displayQuestions(
						this.state.questions,
						this.state.currentQuestionIndex,
						this.nextQuestion,
						this.previousQuestion
					);
				}
			}
		);
	};
	endQuiz = () => {
		const MySwal = withReactContent(Swal);
		MySwal.fire({
			title: "The Quiz is finished! Well Done!",
		});
		setTimeout(() => {
			this.props.history.push("/play/instructions");
		}, 1000);
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
							<p onClick={this.handleOptionClick} className="option">
								{currentQuestion.optionA}
							</p>
							<p onClick={this.handleOptionClick} className="option">
								{currentQuestion.optionB}
							</p>
						</div>
						<div className="options-container">
							<p onClick={this.handleOptionClick} className="option">
								{currentQuestion.optionC}
							</p>
							<p onClick={this.handleOptionClick} className="option">
								{currentQuestion.optionD}
							</p>
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
