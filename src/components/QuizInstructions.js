import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const QuizInstructions = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Quiz Instructions - Quiz App</title>
			</Helmet>
			<div className="container text-center">
				<h1 className="text-center mt-5">Play a simple quiz</h1>
				<h5 className="text-center mt-5">
					There are five Questions, each one have 4 options, you can choose only
					one option.
				</h5>
				<Link to="/play/quiz">
					<button className="btn btn-outline-success mr-2">
						Take the quiz!
					</button>
				</Link>
				<Link to="/">
					<button className="btn btn-outline-secondary ml-2">
						Take me back
					</button>
				</Link>
			</div>
		</Fragment>
	);
};

export default QuizInstructions;
