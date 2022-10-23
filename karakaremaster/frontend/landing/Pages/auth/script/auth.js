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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); //NOT SURE IF THIS IS CORRECT
const analytics = getAnalytics(app);
const db = getDatabase(app);

async function writeUserData(userId, name, email) {
    const reference = ref(db,'users/' + userId);
    console.log(userId);
    set(reference, {
        username: name,
        email: email,
    });
    return 1;
}

function writeClothesData(clothesID, article, color, size, imageUrl) {
    const reference = ref(db,'clothes/' + clothesID);

    set(reference, {
        Article: article,
        Color: color,
        Size: size,
        Image: imageUrl
    });
}

function writeAppointmentsData(appointmentID, firstName, lastName, date, time, itemOne, itemTwo, itemThree) {
    const reference = ref(db,'appointments/' + appointmentID);

    set(reference, {
        "First Name": firstName,
        "Last Name": lastName,
        "Appointment Date": date,
        "Appointment Time": time,
        "Item One": itemOne,
        "Item Two": itemTwo,
        "Item Three": itemThree
    });
}

function writeManager(userId, status) {
    const reference = ref(db, 'users/' + userId);

    set(reference, {
        manager: status,
    });
    console.log("set");
};
    const signupForm = document.getElementById('signup-form');
    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();
        let creating = false;
        //get user info
        const name = signupForm['username'].value;
        const email = signupForm['email'].value;
        const password = signupForm['password'].value;
        console.log(email, password);
        fetchSignInMethodsForEmail(auth, email)
            .then((signInMethods) => {
                if (signInMethods.indexOf(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
                    //user can sign in with email/password
                    signInWithEmailAndPassword(auth, email, password).then((userCredential) => { //PASSWORD MUST BE 6 CHARACTERS
                        //signed in
                        const user = userCredential.user;
                        console.log(user.uid);
                        writeUserData(user.uid, name, email).then(() => {
                            console.log(user.uid, name, email);
                            new Promise(r => setTimeout(r, 2000)).then(() => {
                                window.location.replace("storeManagerMain.html");
                            });
                        })

                        console.log("signed in!");
                        console.log("here");

                    })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        })
                } else {
                    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { //PASSWORD MUST BE 6 CHARACTERS
                        //signed in
                        const user = userCredential.user;
                        console.log("ethan u should look here");
                        console.log("signed in!");
                        console.log(user.uid);
                        writeUserData(user.uid, name, email).then(() => {
                            console.log(user.uid, name, email);
                            new Promise(r => setTimeout(r, 2000)).then(() => {
                                window.location.replace("storeManagerMain.html");
                            }
                            )
                        })
                    })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        })
                }
            })

    })
//User Data Mock Population
writeUserData("42e8a17c779c2c6f7ac98897165393fd", "Mai-Thanh Nguyen", "mai-thanh_nguyen@brown.edu");
writeUserData("f5ab7873e782d2e02e101a5d18a5b80e", "Arvind Sridhar", "arvind_sridhar@brown.edu");
writeUserData("baafc71ba2372d45c2d024337a1a88fa", "Ethan Asis", "ethan_asis@brown.edu");
writeUserData("1d9e525ce9a08eb32e4a7c749c2e5980", "Omar Abdelhamid", "omar_abdelhamid@brown.edu");
writeUserData("f2e413f1bb2d812240cc751851f42309", "Jackson Davis", "jackson_davis@brown.edu");
writeUserData("4331f058df307bd34f2b0f160fade1e5", "Natalee Amhaz", "natalee_amhaz@brown.edu");


//Clothes Data Mock Population
writeClothesData("1", "Shirt", "Pink", "Small", "https://www.kids-world.com/images/CB790.jpg");
writeClothesData("2", "Dress", "Blue", "Large", "https://media1.popsugar-assets.com/files/thumbor/_dShGFL5A5JuclOYUaLIsBtievM/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2014/05/23/894/n/1922564/c8fd1a615bb18d8b_hm-dress-thumb.jpg");
writeClothesData("3", "Shorts", "Green", "Medium", "https://media.istockphoto.com/photos/green-men-shorts-for-swimming-picture-id697913358?k=20&m=697913358&s=612x612&w=0&h=OHSwN-ad3ZI0akZp7FHenyA6GE2-Rn0kU39h1MLbBdU=");
writeClothesData("4", "Pants", "Black", "Large", "https://i.ebayimg.com/images/g/fv4AAOSwmCxgYpz5/s-l300.jpg");
writeClothesData("5", "Shorts", "Red", "Small", "https://i.pinimg.com/originals/ff/0c/5d/ff0c5deb859170b33cccd3ef67a949ae.jpg");
writeClothesData("6", "Scarf", "Yellow", "Small", "https://www.pashminawear.com/1316/yellow-cashmere-scarf-in-twill-weave.jpg");
writeClothesData("7", "Coat", "Grey", "Medium", "https://media.cntraveler.com/photos/60088d408ebb4b589a89b54e/master/w_1280%2Cc_limit/LightweightJackets-2021-Uniqlo.jpg");
writeClothesData("8", "Jacket", "Purple", "Medium", "https://images.stockx.com/images/Moncler-2-Genius-1952-Man-Amaltes-Short-Down-Jacket-Cornflower-Blue.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1643734185");
writeClothesData("9", "Shirt", "Beige", "Small", "https://www.differenta.com/media/produkty/92946/A.jpg");
writeClothesData("10", "Pants", "White", "Large", "https://assets.vogue.com/photos/609d82bc3150cbc8d304e0d2/master/w_1280%2Cc_limit/slide_13.jpg");

//Appointment Data Mock Population
writeAppointmentsData(1, "Mai-Thanh", "Nguyen", "05/03/2022", "11:00 AM", "Medium Shirt", "Small Shorts", "Medium Pants");
writeAppointmentsData(2, "Arvind", "Sridhar", "05/04/2022", "2:00 PM", "Small Jacket", "Medium Pants", "Medium Shirt");
writeAppointmentsData(3, "Ethan", "Asis", "05/06/2022", "9:00 AM", "Large Shorts", "Small Jacket", "Medium Coat");
writeAppointmentsData(4, "Omar", "Abdelhamid", "05/07/2022", "12:00 PM", "Small Scarf", "Medium Shorts", "Large Shirt");
writeAppointmentsData(5, "Jackson", "Davis", "05/07/2022", "2:00 PM", "Large Pants", "Small Dress", "Small Scarf");
writeAppointmentsData(6, "Natalee", "Amhaz", "05/08/2022", "10:00 AM", "Medium Dress", "Large Shirt", "Medium Shirt");