import React from "react";
import firebaseAuth from "./firebaseAuth";
import { Link } from "react-router-dom";

import "./../App.css";
class Login extends React.Component {
	state = {
		email: "",
		password: "",
	};

	loginUser = (e) => {
		e.preventDefault();
		firebaseAuth
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				console.log(user);
				this.props.history.push("/add-quiz-2");
			})
			.catch((err) => {
				alert(err);
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
				<h1 className="text-center mt-5">Login</h1>
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
							<button type="button" onClick={this.loginUser} className="btn btn-primary">
								Login
							</button>
						</div>
						<p className="mt-5 text-center">
							Don't have an account?
							<Link to="/signup"> SignUp</Link>
						</p>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
