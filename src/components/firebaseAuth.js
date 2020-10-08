import firebase from "firebase";
var firebaseConfig = {
	apiKey: "AIzaSyCAaRVNwMrtKVT7d_PRqdEDKhZEU-ZH1K4",
	authDomain: "fir-with-react-b683e.firebaseapp.com",
	databaseURL: "https://fir-with-react-b683e.firebaseio.com",
	projectId: "fir-with-react-b683e",
	storageBucket: "fir-with-react-b683e.appspot.com",
	messagingSenderId: "189972529518",
	appId: "1:189972529518:web:a88bf409263d63d5f8817f",
};
// Initialize Firebase
const firebaseAuth = firebase.initializeApp(firebaseConfig);

export default firebaseAuth;
