document.querySelector('#admin-link').style.display = 'none';

database
    .collection('posts')
    .get()
    .then(result => {
        globalUser = globalUser || {email: null}
        result.forEach(doc => {
            const postsWrapper = document.querySelector('.posts-wrapper');
            const div = document.createElement('div');
            const date = doc.data().date_posted;
            div.innerHTML = `
                <h2>${doc.data().title}</h2>
                <span>Posted on ${date.toString().split('T')[0]} at ${date.toString().split('T')[1]} by Maxime I.</span>
                <p>${doc.data().paragraphs.toString().split(' ').splice(0, 10).join(' ')}...</p>
                <a href="./post.html?docID=${doc.id}&userEmail=${globalUser.email || null}">Read more</a>
            `;
            div.classList.add('post');
            postsWrapper.appendChild(div);
        });
    })


 
async function blogAuth() {
    firebase.auth().onAuthStateChanged(() => {
        if (globalUser){
            document.querySelector('.links-container').style.display = 'none';
            document.querySelector('#auth-logout a').style.display = 'none';
            document.querySelector('#auth-logout').innerHTML = '<button><i class="fa fa-sign-out"></i>&nbsp;Logout</button>';
            document.querySelector('#auth-logout button').addEventListener('click', () => {
                firebase.auth().signOut();
                location.reload();
            });
            const prom = new Promise((resolve, reject) => {
                database
                    .collection('users')
                    .doc(globalUser.email)
                    .get()
                    .then(doc => {
                        if (doc.data().role === 'admin') resolve('admin');
                        else reject('not admin');
                    });
            })
            prom.then(() => {
                document.querySelector('#admin-link').style.display = 'block';
            }).catch((err) => {
                console.log('welcome user');
            });
        } else console.log('user not signed in');
    });
}

blogAuth();
