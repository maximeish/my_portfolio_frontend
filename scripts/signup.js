// redirect to blog page if user is authenticated
firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location.href = './blog.html';
        globalUser = user;
    }

    else console.log('User not signed in')
});
const notif = document.querySelector('#notification');
// Sign user up
const setupOnChange = () => {
    ['#username', '#email', '#password', '#repeat_password'].forEach(val => {
        document.querySelector(val).addEventListener('change', () => {
            notif.style.display = 'none';
        })
    });
}


document.querySelector('#signup-form-id').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value.toString();
    const password = document.querySelector('#password').value;
    const password_chk = document.querySelector('#repeat_password').value;
    const role = 'user';

    const changeNotification = (msg, background) => {
        if (notif.style.animation) notif.style.animation = '';
        notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
        notif.style.display = 'block';
        notif.innerHTML = msg;
        notif.style.background = background || 'rgba(255, 0, 0, 0.5)';
    }

    if (username && email && password && password_chk) {
        if (password === password_chk) {
            database
                .collection("users")
                .doc(email)
                .set({
                    username: username,
                    role: role
                });

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    document.querySelector('#signup-form-id').reset();
                    changeNotification('registration successful', 'rgb(62, 184, 62)');
                })
                .catch(error => {
                    changeNotification(error.message);
                    setupOnChange();
                });
        } else {
            let msg;
            if (!(username.length > 5)) {
                msg = 'Passwords do not match and username should be more than 5 characters';
            }
            notif.innerHTML = 'Passwords do not match' || msg;
            notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
            notif.style.display = 'block';
            notif.style.background = 'rgba(255, 0, 0, 0.5)';
            setupOnChange();
        }
    } else alert('Please, fill in all the fields');
});