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
                    const notif = document.querySelector('#notification');
                    notif.style.display = 'block';
                    notif.innerHTML = 'registration successful';
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const notif = document.querySelector('#notification');
                    notif.style.display = 'block';
                    notif.innerHTML = `${errorMessage} (error code: ${errorCode})`;
                    notif.style.background = 'rgba(255, 0, 0, 0.356)';
                });
        }
    } else alert('Please, fill in all the fields');

});