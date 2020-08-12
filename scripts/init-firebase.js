// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBm_cO6kpbZPw-USUP5qNeCeIUUIx8Tb_c",
    authDomain: "maxime-portfolio.firebaseapp.com",
    databaseURL: "https://maxime-portfolio.firebaseio.com",
    projectId: "maxime-portfolio",
    storageBucket: "maxime-portfolio.appspot.com",
    messagingSenderId: "277428965287",
    appId: "1:277428965287:web:cd23ba4a4a57c33758f082",
    measurementId: "G-94LP44ZN00"
});

firebase.analytics();

const database = firebase.firestore();
<<<<<<< HEAD
const storage = firebase.storage();
const storageRef = storage.ref();
=======
>>>>>>> ft-blog-landing-page
