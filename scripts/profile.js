document.querySelector('#curr-username').style.display = 'none';
document.querySelector('#curr-email').style.display = 'none';

firebase.auth().onAuthStateChanged(user => {

    function notify(msg, disp = 'block') {
        document.querySelector('#curr-username').style.display = 'none'
        document.querySelector('#curr-email').style.display = 'none'
        document.querySelector('#notif-status').style.display = disp;
        document.querySelector('#notif-status').innerHTML = msg;
    }


    if (user) {
        database
            .collection('users')
            .doc(user.email)
            .get()
            .then(doc => {
                if (doc) {
                    document.querySelector('#notif-status').style.display = 'none';
                    document.querySelector('#curr-username strong').innerHTML = doc.data().username;
                    document.querySelector('title').innerHTML += ` | ${doc.data().username}`;
                    document.querySelector('#curr-username').style.display = 'block';
                    document.querySelector('#curr-email strong').innerHTML = user.email;
                    document.querySelector('#curr-email').style.display = 'block';

                    document.querySelector('#update-form').addEventListener('submit', e => {
                        e.preventDefault();
                        notify('checking and saving data...', 'block');
                        let newUsername = document.querySelector('#new_username').value;
                        let newEmail = undefined;
                        let currentPassword = document.querySelector('#current_password').value;
                        let newPassword = document.querySelector('#new_password').value;

                        console.log(newUsername, newEmail, newPassword);


                        if (currentPassword !== undefined && currentPassword) {
                            var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

                            user.reauthenticateWithCredential(cred)
                                .then(() => {
                                    console.log('successfully reauthenticated');
                                    let updated = false;
                                    
                                    if (newEmail !== undefined && newEmail) {
                                        database.collection('users')
                                            .doc(newEmail)
                                            .set({
                                                username: newUsername || doc.data().username,
                                                role: doc.data().role || 'user'
                                            })
                                            .then(() => {
                                                database.collection('users')
                                                    .doc(user.email)
                                                    .delete()
                                                    .then(() => {
                                                        console.log('old email deleted')
                                                        user
                                                            .updateProfile({
                                                                displayName: newUsername || doc.data().username
                                                            })
                                                            .then(res => {
                                                                user
                                                                    .updateEmail(newEmail)
                                                                    .then(() => {
                                                                        console.log('email updated');
                                                                        if (newPassword !== undefined && newPassword) {
                                                                            user
                                                                                .updatePassword(newPassword)
                                                                                .then(() => {
                                                                                    console.log('password updated successfully')
                                                                                    notify('your data was updated successfully');
                                                                                    
                                                                                    setTimeout(() => {
                                                                                        firebase.auth().signOut();
                                                                                        window.location.href = './blog.html';
                                                                                    }, 2000);
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err)
                                                                                    notify('cannot update the user password. try to sign in again');

                                                                                    setTimeout(() => {
                                                                                        firebase.auth().signOut();
                                                                                        window.location.href = './login.html'
                                                                                    }, 2000);
                                                                                })
                                                                        } else {
                                                                            notify('your data was updated successfully');

                                                                            setTimeout(() => {
                                                                                firebase.auth().signOut();
                                                                                window.location.href = './blog.html';
                                                                            }, 2000);
                                                                        }
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err);
                                                                        notify('error updating user email. try to sign in again');

                                                                        setTimeout(() => {
                                                                            firebase.auth().signOut();
                                                                            window.location.href = './login.html';
                                                                        }, 2000);
                                                                    })
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                                notify("cannot update the your display name. try to sign in again");

                                                                setTimeout(() => {
                                                                    firebase.auth().signOut();
                                                                    window.location.href = './login.html';
                                                                }, 2000);
                                                            })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        notify('cannot delete old email');
                                                        setTimeout(() => {
                                                            firebase.auth().signOut();
                                                            window.location.href = './blog.html';
                                                        }, 2000);
                                                    })
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                notify('cannot update email');
                                                setTimeout(() => {
                                                    firebase.auth().signOut();
                                                    window.location.href = './blog.html';
                                                }, 2000);
                                            })
                                    } 

                                    else {
                                        user
                                            .updateProfile({
                                                displayName: newUsername || doc.data().username
                                            })
                                            .then(() => {
                                                database.collection('users')
                                                    .doc(user.email)
                                                    .set({
                                                        username: newUsername || doc.data().username,
                                                        role: doc.data().role || 'user'
                                                    })
                                                    .then(() => {
                                                        if (newPassword !== undefined && newPassword) {
                                                            user
                                                                .updatePassword(newPassword)
                                                                .then(() => {
                                                                    notify('user data changed successfully');

                                                                    setTimeout(() => {
                                                                        firebase.auth().signOut();
                                                                        window.location.href = './login.html';
                                                                    }, 2000);
                                                                })
                                                                .catch(err => {
                                                                    console.log(err);
                                                                    notify('cannot change the password. try to sign in again')
                                                                    setTimeout(() => {
                                                                        firebase.auth().signOut();
                                                                        window.location.href = './login.html';
                                                                    }, 2000);
                                                                })
                                                        } else {
                                                            notify('user data changed successfully')
                                                            
                                                            setTimeout(() => {
                                                                firebase.auth().signOut()
                                                                window.location.href = './login.html';
                                                            }, 2000)
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        notify('cannot change the username');
                                                        setTimeout(() => {
                                                            firebase.auth().signOut();
                                                            window.location.href = './blog.html';
                                                        }, 2000)
                                                    })
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                notify("cannot update the user display name. try to sign in again");
                                                setTimeout(() => {
                                                    firebase.auth().signOut();
                                                    window.location.href = './login.html';
                                                }, 2000);
                                            })
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    notify('cannot reauthenticate user');
                                    setTimeout(() => {
                                        firebase.auth().signOut();
                                        window.location.href = './blog.html';
                                    }, 2000);
                                })
                        } else {
                            notify('You need to provide your current password')
                            setTimeout(() => {
                                location.reload()
                            }, 2000);
                        }
                    });

                    document.querySelector('#delete-account').addEventListener('click', e => {
                        notify('deleting account...', 'block');
                        let currentPassword = document.querySelector('#current_password').value;

                        if (currentPassword !== undefined && currentPassword) {
                            var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

                            user.reauthenticateWithCredential(cred)
                                .then(() => {
                                    user.delete()
                                        .then(() => {
                                            notify('your account has been deleted');
                                            setTimeout(() => {
                                                firebase.auth().signOut();
                                                window.location.href = './blog.html';
                                            }, 2000);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            notify('cannot delete user. try to sign in again');
                                            setTimeout(() => {
                                                firebase.auth().signOut();
                                                window.location.href = './blog.html';
                                            }, 2000);
                                        })
                                })
                                .catch(err => {
                                    console.log(err);
                                    notify('cannot reauthenticate user');
                                    setTimeout(() => {
                                        firebase.auth().signOut();
                                        window.location.href = './blog.html';
                                    }, 2000);
                                })
                        } else {
                            notify('You need to provide your current password')
                            setTimeout(() => {
                                location.reload()
                            }, 2000);
                        }

                    })
                } else {
                    notify('You are not authorized to view this page.');
                    document.querySelector('#update-form').style.display = 'none';
                    document.querySelector('#header').style.display = 'none';
                    setTimeout(() => {
                        window.location.href = './blog.html';
                    }, 1500)
                }
            })
            .catch(error => {
                notify('Error retrieving your data');
                document.querySelector('#update-form').style.display = 'none';
                document.querySelector('#header').style.display = 'none';
                setTimeout(() => {
                    window.location.href = './blog.html';
                }, 1500)
            });
    } else {
        notify('You are not authorized to view this page.');
        document.querySelector('#update-form').style.display = 'none';
        document.querySelector('#header').style.display = 'none';
        setTimeout(() => {
            window.location.href = './blog.html';
        }, 1500)
    }
});
