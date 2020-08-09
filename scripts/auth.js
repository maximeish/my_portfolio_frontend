firebase.auth().onAuthStateChanged(user =>
    user ? window.location.href = './blog.html' 
    : console.log('User not signed in')
);

const provider = new firebase.auth.GoogleAuthProvider();

const onInputChange = () => document.querySelector('#notification').setAttribute('hidden', 'true');