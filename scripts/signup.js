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


// Sign user up

document.querySelector('#signup-form-id').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const password_chk = document.querySelector('#repeat_password').value;

    if (username && email && password && password_chk) {
        if (password === password_chk) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // const notif = document.querySelector('#notification');
                    // notif.style.display = 'block';
                    // notif.innerHTML = 'registration successful';
                    document.querySelector('#signup-form-id').reset();
                    changeNotification('registration successful', 'rgb(62, 184, 62)');
                })
                .catch(error => {
                    // const errorMessage = error.message;
                    // const notif = document.querySelector('#notification');
                    // notif.style.display = 'block';
                    // notif.innerHTML = errorMessage;
                    // notif.style.background = 'rgba(255, 0, 0, 0.5)';
                    changeNotification(error.message);
                });
        } else {

        }
    } else alert('Please, fill in all the fields');

    const changeNotification = (msg, background) => {
        const notif = document.querySelector('#notification');
        notif.style.animation = 'notificationEffect'
        notif.style.display = 'block';
        notif.innerHTML = msg;
        notif.style.background = background || 'rgba(255, 0, 0, 0.5)';
    }

});