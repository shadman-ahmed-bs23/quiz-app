import React from "react";
import firebaseAuth from "./firebaseAuth";
import { Link } from "react-router-dom";

import "./../App.css";

class SignUp extends React.Component {
	state = {
		email: "",
		password: "",
	};

	signUpUser = (e) => {
		e.preventDefault();
		firebaseAuth
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				console.log(user);
				this.props.history.push("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	render() {
		return (
			<div className="container">
				<h1 className="text-center mt-5">Sign Up</h1>
				<div className="form-div">
					<form>
						<div class="form-group">
							<label htmlFor="email">Email address</label>
							<input
								type="email"
								id="email"
								name="email"
								className="form-control"
								placeholder="Enter your email Address"
								onChange={this.handleChange}
								value={this.state.email}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="Password">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								className="form-control"
								placeholder="Enter your Password"
								onChange={this.handleChange}
								value={this.state.password}
							/>
						</div>
						<div className="text-center">
							<button onClick={this.signUpUser} className="btn btn-info">
								Sign Up
							</button>
						</div>
						<p className="mt-5 text-center">
							Already have an account?
							<Link to="/login"> Login</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}
export default SignUp;
