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
			<h1 className="text-center mt-5">Quiz App</h1>

			<Link to="/play/instructions">
				<button className="btn btn-primary mr-5">Play</button>
			</Link>
			<Link to="/login">
				<button className="btn btn-info mr-5">Login</button>
			</Link>
			<Link to="/register">
				<button className="btn btn-secondary mr-5">Sign Up</button>
			</Link>
		</div>
	</Fragment>
);

export default Home;
