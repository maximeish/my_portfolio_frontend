document.querySelector('#login-google-btn').addEventListener('click', e => {
    e.preventDefault();

    loginUsingGoogle();
});

document.querySelector('#login-btn').addEventListener('click', e => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email && password) login(email, password);

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