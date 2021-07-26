var globalUser;
// redirect to blog page if user is authenticated
let userSettings = document.querySelector('#user-settings');

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        // window.location.href = './blog.html';
        globalUser = user;
        userSettings.style.display = 'block';
    } else {
        userSettings.style.display = 'none';
    }
});

// remove the error on input change
const onInputChange = () => document.querySelector('#notification').setAttribute('hidden', true);


