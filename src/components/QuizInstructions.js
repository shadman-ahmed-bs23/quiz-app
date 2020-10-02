import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const QuizInstructions = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Quiz Instructions - Quiz App</title>
			</Helmet>
			<div className="container">
				<h1 className="text-center mt-5">Just play a simple quiz app</h1>
				<h3 className="text-center mt-5">
					There are no instructions actually :V
				</h3>
			</div>
		</Fragment>
	);
};

export default QuizInstructions;
