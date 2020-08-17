// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBm_cO6kpbZPw-USUP5qNeCeIUUIx8Tb_c",
    authDomain: "maxime-portfolio.firebaseapp.com",
    databaseURL: "https://maxime-portfolio.firebaseio.com",
    projectId: "maxime-portfolio",
    storageBucket: "maxime-portfolio.appspot.com",
    messagingSenderId: "277428965287",
    appId: "1:277428965287:web:cd23ba4a4a57c33758f082",
    measurementId: "G-94LP44ZN00"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Initialize Cloud Firestore through Firebase
var database = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
