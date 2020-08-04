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


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    //   var displayName = user.displayName;
    //   var email = user.email;
    //   var emailVerified = user.emailVerified;
    //   var photoURL = user.photoURL;
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   var providerData = user.providerData;
      window.location.href = './blog.html';
      // ...
    }
  });