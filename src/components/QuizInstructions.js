import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "firebase/firestore"
import firebaseAuth from './firebaseAuth';

const QuizInstructions = () => {
	useEffect (() => {
		fetchTopics(); 
	}, []); 

	const [topics, setTopics] = useState([]); 
	let firestore = firebaseAuth.firestore();
	const fetchTopics = async () => {
		const data = await firestore
												.collection("quizzes")
												.get();
									 
		console.log(data.docs.map(doc=> doc.id));
		setTopics(data.docs);
	}
	return (
		<Fragment>
			<Helmet>
				<title>Quiz Instructions - Quiz App</title>
			</Helmet>

			<div className="container text-center">
				
				<h1 className="text-center mt-5">Play a simple quiz</h1>
				<h4 className="text-center">Choose quiz topic:</h4>
				{topics.map(doc => (
					<div key={doc.id}>
						<button className="btn btn-outline-light mb-3">
							<Link to={`/play/quiz/${doc.id}`}> {doc.data().topicName} </Link>
						</button>
					</div>
				))}
				<h5 className="text-center mt-5">
					There are five Questions for each topic, each one have 4 options, you can choose only
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
