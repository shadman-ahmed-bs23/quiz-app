import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./../App.css";

const Home = () => (
	<Fragment>
		<Helmet>
			{" "}
			<title>Quiz App - Home</title>{" "}
		</Helmet>

		<div className="home">
			<h1 className="text-center">Quiz App</h1>

			<div className="play-div text-center">
				<Link to="/play/instructions">
					<button className="btn btn-primary">Play</button>
				</Link>
			</div>
			<div className="result-div text-center mt-3">
				<Link to="/results">
					<button className="btn btn-outline-success">Results</button>
				</Link>
			</div>
			<div className="login-div mt-5	text-center">
				<h3>Want to add custom quiz? </h3>

				<Link to="/login">
					<button className="btn btn-info mr-2">Login</button>
				</Link>
				<Link to="/signup">
					<button className="btn btn-secondary ml-2">Sign Up</button>
				</Link>
			</div>
		</div>
	</Fragment>
);

export default Home;
