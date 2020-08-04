// Sign user up

const notif = document.querySelector('#notification');

document.querySelector('#signup-form-id').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const password_chk = document.querySelector('#repeat_password').value;

    const changeNotification = (msg, background) => {
        if (notif.style.animation) notif.style.animation = '';
        notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
        notif.style.display = 'block';
        notif.innerHTML = msg;
        notif.style.background = background || 'rgba(255, 0, 0, 0.5)';
    }

    const setupOnChange = () => {
        ['#username', '#email', '#password', '#repeat_password'].forEach(val => {
            document.querySelector(val).addEventListener('change', () => {
                notif.style.display = 'none';
            });
        })
    }

    if (username && email && password && password_chk) {
        if (password === password_chk) {
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
            notif.innerHTML = 'Passwords do not match';
            notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
            notif.style.display = 'block';
            notif.style.background = 'rgba(255, 0, 0, 0.5)';
            setupOnChange();
        }
    } else alert('Please, fill in all the fields');
});