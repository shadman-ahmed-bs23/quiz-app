import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

class Quiz extends React.Component {
	render() {
		return (
			<Fragment>
				<Helmet>
					<title>Quiz Page</title>{" "}
				</Helmet>
				<div className="container">
					<div className="questions">
						<h5>Google was found in what year? </h5>
						<div className="options-container">
							<p className="option">1997</p>
							<p className="option">1998</p>
						</div>
						<div className="options-container">
							<p className="option">1999</p>
							<p className="option">2000</p>
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
