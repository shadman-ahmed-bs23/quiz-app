import React from 'react' 
import { browserHistory, Link } from "react-router-dom";
import firebase from 'firebase'; 
import "firebase/firestore"
import firebaseAuth from './firebaseAuth';


class QuizForm extends React.Component {
  initState = {
    questionObj: {question: 'Another Question?', optionA: 'Arteta', optionB: 'Bale', optionC: 'Cristiano', optionD: 'Dani', answer: 'Cristiano'}
  }
  state = {
    number: 0, 
    questions: {
      question: 'Another Question?', 
      optionA: 'Arteta', 
      optionB: 'Bale', 
      optionC: 'Cristiano', 
      optionD: 'Dani', 
      answer: 'Cristiano'
    }
  }
  showNumber = () => {
    if(this.state.number < 5) {
      console.log(this.state.number);

      return (
        <div>
          {this.state.number + 1} No. question out of 5 Questions
        </div>
      )
    }
    else {
      window.location.assign('/');
    }

  }
  
  
  nextQuestion = (e) => {
    e.preventDefault();
    const question = this.question.value; 
    const optionA = this.optionA.value;
    const optionB = this.optionB.value;  
    const optionC = this.optionC.value; 
    const optionD = this.optionD.value; 
    const answer = this.answer.value; 
    if(question === '' || answer === '' || optionA === '' || optionB === '' || optionC === '' || optionD ==='') {
      console.log("Empty"); 
      alert("Form can't be empty!"); 
      window.location.reload();
    }
    this.question.value = ''; 
    this.optionA.value = ''; 
    this.optionB.value = ''; 
    this.optionC.value = ''; 
    this.optionD.value = ''; 
    this.answer.value = ''; 
    const obj = {
      question: question, 
      optionA: optionA, 
      optionB: optionB, 
      optionC: optionC, 
      optionD: optionD,
      answer: answer 
    }
    
    
    // Firebase firestore config
    let firestore = firebaseAuth.firestore();

    //Creating a empty collection with "questions" array
    if(this.state.number === 0) {
      //console.log("I am in");
      firestore
        .collection(this.props.topicName)
        .doc(this.props.topicName)
        .set({
          id: this.props.topicName,
          questions: [obj]
        })
        .then(() => {
           //Incrementing question number    
            this.setState({number: this.state.number + 1});
            console.log("Successfully added")
        }); 
    } else {
      var questionArray = [];
      let questionObj = this.state.questions;
      //Storing question into firestore
      firestore
        .collection(this.props.topicName)
        .doc(this.props.topicName)
        .get()
        .then(doc => {
          //console.log(doc.data().questions);
          questionArray = doc.data().questions;
          console.log(questionArray);
          questionArray.push(obj);
          console.log(questionArray); 
          firestore
            .collection(this.props.topicName)
            .doc(this.props.topicName)
            .update({
              questions: questionArray
            })
            .then(() => {
              this.setState({number: this.state.number + 1});
              console.log("Successfully updated!");
            })
            .catch(function (error) {
              console.log("error writing docs,", error); 
            });
        });
      }      
  }
  render() {
    //console.log("from the form component", this.props.topicName); 
    
    return (
      <div>
        
        {this.showNumber()} 
        <form onSubmit={this.nextQuestion}>
          <div className="form-group">
            <label htmlFor="question">Question: </label>
            <input
              type="text"
              name="question"
              className="form-control"
              placeholder="question"
              ref={input => this.question = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="optionA">Option A: </label>
            <input
              type="text"
              name="optionA"
              className="form-control"
              placeholder="A"
              ref={input => this.optionA = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="optionB">Option B: </label>
            <input
              type="text"
              name="optionB"
              className="form-control"
              placeholder="B"
              ref={input => this.optionB = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="optionC">Option C: </label>
            <input
              type="text"
              name="optionC"
              className="form-control"
              placeholder="C"
              ref={input => this.optionC = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="optionD">Option D: </label>
            <input
              type="text"
              name="optionD"
              className="form-control"
              placeholder="D"
              ref={input => this.optionD = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer: </label>
            <input
              type="text"
              name="answer"
              className="form-control"
              placeholder="answer"
              ref={input => this.answer = input}
            />
          </div>
          <button type="submit" className="btn btn-info">Next Question</button>
        </form> 
        
      </div>
    )
  }
}
export default QuizForm; 