import React, { Fragment } from "react";
import firebaseAuth from "./firebaseAuth";

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
				console.log(err);
			});
	};
	signUpUser = (e) => {
		e.preventDefault();
		firebaseAuth
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				console.log(user);
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
			<div>
				<h1>Login Component</h1>
				<form>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email Address"
						onChange={this.handleChange}
						value={this.state.email}
					/>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter your Password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
					<button onClick={this.loginUser}>Login</button>
					<button onClick={this.signUpUser}>SignUp</button>
				</form>
			</div>
		);
	}
}

export default Login;
