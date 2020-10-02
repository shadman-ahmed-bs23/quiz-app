import React from "react";
import "./../App.css";

const AddQuiz = ({
	question,
	setQuestion,
	option1,
	option2,
	option3,
	option4,
	setOption1,
	setOption2,
	setOption3,
	setOption4,
	answer,
	setAnswer,
}) => {
	const questionHandler = (e) => {
		console.log(e.target.value);
		setQuestion(e.target.value);
	};
	return (
		<div className="AddQuiz container">
			<h3>Add Quiz Component</h3>

			<form>
				<input
					value={question}
					onChange={(e) => {
						this.setQuestion(e.target.value);
					}}
					type="text"
				/>
			</form>
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
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddQuiz;
