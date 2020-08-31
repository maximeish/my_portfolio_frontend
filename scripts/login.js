// redirect to blog page if user is authenticated
firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location.href = './blog.html';
        globalUser = user;
    }
});

const provider = new firebase.auth.GoogleAuthProvider();

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
const login = (email, password, role) => {
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


document.querySelector('#login-google-btn').addEventListener('click', e => {
    e.preventDefault();

    loginUsingGoogle();
});

document.querySelector('#login-btn').addEventListener('click', e => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email && password) login(email, password, 'user');

    else {
        const notif = document.querySelector('#notification');
        notif.removeAttribute('hidden');
        if (notif.style.animation) notif.style.animation = '';
        notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
        notif.style.display = 'block';
        notif.innerHTML = 'Please, fill all the fields';
        notif.style.background = 'rgba(255, 0, 0, 0.5)';
        ['#email', '#password'].forEach(val => {
            document.querySelector(val).addEventListener('change', e => {
                notif.style.display = 'none';
                notif.setAttribute('hidden', true);
            });
        })
    }
});