import React from "react";
import "./../App.css";

import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<h3>Quick Quiz</h3>

			<ul className="nav-links">
				<Link to="/login">
					<li>Admin Login</li>
				</Link>
				<Link to="/quiz">
					<li>Quiz</li>
				</Link>
				<Link to="/add-quiz">
					<li>Add Quiz</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;
