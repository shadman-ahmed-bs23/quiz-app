import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./../App.css"

import "firebase/firestore"
import firebaseAuth from './firebaseAuth';

const Result = () => {
  const [results, setResults] = useState([]); 
	useEffect (() => {
    let firestore = firebaseAuth.firestore(); 
    const saveLastResult = () => {
      const name = localStorage.getItem("name"); 
      const score = localStorage.getItem("score"); 
      localStorage.removeItem("name"); 
      localStorage.removeItem("score");
      console.log(name + " " + score);
      if(name !== null && score !== null) {
        firestore
          .collection("Results")
          .doc(name)
          .set({
            name: name, 
            score: score
          })
          .then(function() {
            console.log("Successfully added!"); 
          })
          .catch(error => {
            console.log(error); 
          }); 
      }
    };
    saveLastResult();
    const fetchResults = async () => {
      const data = await firestore
                          .collection("Results")
                          .get();
                     
      console.log(data.docs.map(doc=> doc.id));
      setResults(data.docs);
    } 
		fetchResults(); 
	}, []); 
  
  
	
	
	
  
	return (
		<Fragment>
			<Helmet>
				<title>Quiz Results</title>
			</Helmet>

			<div className="container text-center">
				
				<h1 className="text-center mt-5">Results</h1>
        <ul class="list-group">
          {results.map(doc => (
            <li key={doc.id} className="list-group-item text-dark d-flex justify-content-between align-items-center"> 
              {doc.data().name} 
              <span class="badge badge-primary badge-pill">Score: {doc.data().score}</span>
            </li>

          ))}
        </ul>
        
				
				<Link to="/">
					<button className="btn btn-outline-secondary ml-2 mt-5">
						Go to Home
					</button>
				</Link>
			</div>
		</Fragment>
	);
};

export default Result;
