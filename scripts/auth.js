// redirect to blog page if user is authenticated
firebase.auth().onAuthStateChanged(user =>
    user ? window.location.href = './blog.html' 
    : console.log('User not signed in')
);

const provider = new firebase.auth.GoogleAuthProvider();


// remove the error on input change
const onInputChange = () => document.querySelector('#notification').setAttribute('hidden', true);


// log in the user using Google Auth

function loginUsingGoogle() {
    firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
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
            console.log(error);
        });
}


//log in the user
const login = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => console.log('Login successful'))
        .catch(err => {
            // var errorCode = error.code;
            const notif = document.querySelector('#notification');
            notif.removeAttribute('hidden');
            if (notif.style.animation) notif.style.animation = '';
            notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
            notif.style.display = 'block';
            notif.innerHTML = err.message;
            notif.style.background = 'rgba(255, 0, 0, 0.5)';
            ['#email', '#password'].forEach(val => {
                document.querySelector(val).addEventListener('change', () => onInputChange());
            });
        });

}