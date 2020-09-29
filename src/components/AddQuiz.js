import { render } from "@testing-library/react";
import React from "react";
import "./../App.css";

function AddQuiz() {
	return (
		<div className="AddQuiz container">
			<h3>Add Quiz Component</h3>
			<div className="formDiv">
				<form>
					<div className="form-group">
						<label htmlFor="questionText">Question</label>
						<input type="text" className="form-control" id="questionText" />
					</div>
					<div className="form-group option">
						<label htmlFor="option1">Option 1</label>
						<input type="text" className="form-control" id="option1" />
						<label htmlFor="option1">Option 2</label>
						<input type="text" className="form-control" id="option2" />
						<label htmlFor="option1">Option 3</label>
						<input type="text" className="form-control" id="option3" />
						<label htmlFor="option1">Option 4</label>
						<input type="text" className="form-control" id="option4" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddQuiz;
