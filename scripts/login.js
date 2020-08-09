document.querySelector('#login-google-btn').addEventListener('click', e => {
    e.preventDefault();

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(result => {
        console.log('this is the returned result', result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('this is the authd user', user);
        // ...
    })
    .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
        // ...
    });
});