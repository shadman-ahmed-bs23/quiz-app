import React, { Fragment } from "react";

import { Helmet } from "react-helmet";

//import questions from "./../questions.json";
import isEmpty from "./../is-empty.js";
import "firebase/firestore"
import firebaseAuth from './firebaseAuth';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class Quiz extends React.Component {
	state = {
		questions: [],
		currentQuestion: {},
		nextQuestion: {},
		previousQuestion: {},
		answer: "",
		numberOfAnsweredQuestion: 0,
		currentQuestionIndex: 0,
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
		nextButtonDisabled: false,
		previousButtonDisabled: true,
		time: {},
	};
	async componentDidMount() {
		console.log(this.props.match.params.id);
		let firestore = firebaseAuth.firestore();
		const response =  await firestore
															.collection(this.props.match.params.id)
															.doc(this.props.match.params.id)
															.get()
															.then(function(doc) {
																return doc.data().questions;
															});
		console.log(response); 
		this.setState({
			questions: response
		})
		/*
		let collectionName = "Real Madrid"; 
		let docName = "Real Madrid"; 
		
		async function getValues() {
			let doc = await firestore.collection("Real Madrid").doc("Real Madrid").get(); 
			if(doc.exists) {
				return  doc.data().questions; 
			}
			throw new Error("No Such Dcoument");
		}
		
		
		var promise = getValues();
		promise.then(questions => {
			this.setState({
				questions: questions
			});
		});
		*/
		
		console.log(this.state.questions);
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
		this.startTimer();
	}
	//Displaying all quiz question
	displayQuestions = (
		questions = this.state.questions,
		currentQuestion,
		nextQuestion,
		previousQuestion
	) => {
		let { currentQuestionIndex } = this.state;
		console.log(this.state.questions)
		if (!isEmpty(this.state.questions)) {
			questions = this.state.questions;
			currentQuestion = questions[currentQuestionIndex];
			console.log(currentQuestion);
			nextQuestion = questions[currentQuestionIndex + 1];
			previousQuestion = questions[currentQuestionIndex - 1];
			const answer = currentQuestion.answer;
			this.setState(
				{
					currentQuestion,
					nextQuestion,
					previousQuestion,
					answer,
				},
				() => {
					this.handleDisableButton();
				}
			);
		}
	};
	// Handle Answer/ Option Button click
	handleOptionClick = (e) => {
		if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
			this.correctAnswer();
		} else {
			this.wrongAnswer();
		}
	};
	showAlert = () => {
		const MySwal = withReactContent(Swal);

		return MySwal.fire({
			icon: "success",
			title: "Answer Taken",
			confirmButtonText: "Sure",
		});
	};
	//Handle next button
	handleNextButtonClick = (e) => {
		if (this.state.nextQuestion !== undefined) {
			this.setState(
				(prevState) => ({
					currentQuestionIndex: prevState.currentQuestionIndex + 1,
				}),
				() => {
					this.displayQuestions(
						this.state.state,
						this.state.currentQuestion,
						this.state.nextQuestion,
						this.state.previousQuestion
					);
				}
			);
		}
	};
	//Handle previous button
	handlePreviousButtonClick = (e) => {
		if (this.state.previousQuestion !== undefined) {
			this.setState(
				(prevState) => ({
					currentQuestionIndex: prevState.currentQuestionIndex - 1,
				}),
				() => {
					this.displayQuestions(
						this.state.state,
						this.state.currentQuestion,
						this.state.nextQuestion,
						this.state.previousQuestion
					);
				}
			);
		}
	};
	//Handle Quit Button
	//handleQuitButtonClick = (e) => {}

	//Disabling previous and next button when necessary
	handleDisableButton = () => {
		//For previous button
		if (
			this.state.previousQuestion === undefined ||
			this.state.currentQuestionIndex === 0
		) {
			this.setState({
				previousButtonDisabled: true,
			});
		} else {
			this.setState({
				previousButtonDisabled: false,
			});
		}
		//For Next button
		if (
			this.state.nextQuestion === undefined ||
			this.state.currentQuestionIndex + 1 === 5
		) {
			this.setState({
				nextButtonDisabled: true,
			});
		} else {
			this.setState({
				nextButtonDisabled: false,
			});
		}
	};

	//Function for selecting correct answer
	correctAnswer = () => {
		const MySwal = withReactContent(Swal);
		
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
					this.endQuiz(this.state.score);
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

	//Function for selecting a wrong answer
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
					this.endQuiz(this.state.score);
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

	//Timer of the quiz
	startTimer() {
		const countDownTime = Date.now() + 150000;
		this.interval = setInterval(() => {
			const now = new Date();
			const distance = countDownTime - now;

			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (distance < 0) {
				clearInterval(this.interval);
				this.setState(
					{
						time: {
							minutes: 0,
							seconds: 0,
						},
					},
					() => {
						alert("Quiz has ended");
						this.props.history.push("/");
					}
				);
			} else {
				this.setState({
					time: {
						minutes,
						seconds,
					},
				});
			}
		}, 1000);
	}

	endQuiz = (score) => {
		const MySwal = withReactContent(Swal);
		localStorage.setItem("score", score);
		console.log(score);
		MySwal.fire({
			title: "The Quiz is finished! \nYour Score is " + score,
			input: 'text',
			inputLabel: "Your name:", 
			showCancelButton: true, 
			inputPlaceholder: "Enter your name", 
			inputValidator: (value) => {
				if(!value) {
					return 'You need to write something!'
				}
				else {
					localStorage.setItem("name", value); 
					setTimeout(() => {
						window.location.assign('/quiz-app/results')
					}, 2000); 
				}
			}
		});
		
	};

	render() {
		console.log(this.props.match.params.id);
		const {
			questions,
			currentQuestion,
			currentQuestionIndex,
			time,
			previousButtonDisabled,
			nextButtonDisabled,
		} = this.state;
		console.log(currentQuestion);
		console.log(questions);
		//console.log(this.state.currentQuestionIndex);
		return (
			<Fragment>
				<Helmet>
					<title>Quiz Page</title>{" "}
				</Helmet>
				<div className="container">
					<div className="questions">
						{/* Countdown Timer */}
						<h1>
							{time.minutes}:{time.seconds}
						</h1>
						<h5>
							{currentQuestionIndex + 1}. {currentQuestion.question}
						</h5>
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
							<button
								id="preivous-btn"
								onClick={this.handlePreviousButtonClick}
								className={`btn btn-secondary mr-2 ${
									previousButtonDisabled ? "disable" : ""
								}`}
							>
								Previous
							</button>
							<button
								id="next-btn"
								onClick={this.handleNextButtonClick}
								className={`btn btn-success  mr-2 ${
									nextButtonDisabled ? "disable" : ""
								}`}
							>
								Next
							</button>
							<button id="quit-btn" className="btn btn-danger mr-2">
								Quit
							</button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Quiz;
