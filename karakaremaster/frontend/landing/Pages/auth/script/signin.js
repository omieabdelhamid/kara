// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, EmailAuthProvider} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
// import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDV0CfJW69B2rLY8vzzkUd1pZeOCVH-Tjk",
    authDomain: "cs32-term-project-31ba1.firebaseapp.com",
    databaseURL: "https://cs32-term-project-31ba1-default-rtdb.firebaseio.com",
    projectId: "cs32-term-project-31ba1",
    storageBucket: "cs32-term-project-31ba1.appspot.com",
    messagingSenderId: "629420865855",
    appId: "1:629420865855:web:c16a5566fbf2f6be9d7b8a",
    measurementId: "G-7M0D1V353T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const ManagerKey = ""

const signInForm = document.getElementById('signup-form');
document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()
    const email = signInForm['email'].value;
    const password = signInForm['password'].value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        new Promise(r => setTimeout(r, 2000)).then(() => {
            window.location.replace("residentLookup.html");
        });
    }).catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
            document.getElementById("sign").innerHTML = "Wrong Email or Password";
            document.getElementById("sign").style.color = "red";
        } else if (errorCode === "auth/user-not-found") {
            document.getElementById("sign").innerHTML = "Account not found";
            document.getElementById("sign").style.color = "red";

        }
        const errorMessage = error.message;
        console.log(errorCode);
    })
})