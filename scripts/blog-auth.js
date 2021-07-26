document.querySelector('#admin-link').style.display = 'none';
const arrDates = [];
let count = 0;
let imageRef;
const postsWrapper = document.querySelector('.posts-wrapper');

database
    .collection('posts')
    .get()
    .then(result => {
        globalUser = globalUser || {email: null}
        let counter = 0;
        result.forEach(async doc => {
            
            const div = document.createElement('div');

            // Date formatting
            
            const date = doc.data().date_posted;
            const first = date.toDate().toString().split(' ').slice(0, 4);
            first[0] = first[0] + ",";
            let second = date.toDate().toString().split(' ').slice(4, 5);
            second = second.toString().split(':');
            second.splice(2, 1);
            let imgID = doc.data().title.toString().split(" ").join("-");
            div.innerHTML = `
                <div class="image-preview" id="${imgID}"></div>
                <h2>${doc.data().title}</h2>
                <span>${first.join(" ") + " at " + second.join(":")} by Maxime I.</span>
                <p>${doc.data().paragraphs.toString().split(' ').splice(0, 10).join(' ')}...</p>
                <a href="./post.html?docID=${doc.id}&userEmail=${globalUser.email || null}">Read more</a>
            `;
            div.classList.add('post');
            // div.setAttribute('id', `a${arrDates[count++]}`);
            postsWrapper.appendChild(div);

            // Get the image for post preview
            imageRef = storageRef.child(doc.data().imageFilename);
            let imgDiv = document.querySelector(`#${imgID}`);
            await imageRef.getDownloadURL().then(url => {
                imgDiv.innerHTML = `
                    <img src="${url}" alt="" />
                `;
            }).catch(error => {
                console.log('Error downloading image: ', error);
            })
        });
        // Sort posts in chronological order
        const sortedPosts = arrDates.sort((a, b) => b - a);
        for (let i = 0; i < sortedPosts.length; ++i) postsWrapper.appendChild(document.querySelector(`#a${sortedPosts[i]}`));
    });


firebase.auth().onAuthStateChanged(user => {
    if(user) {
        document.querySelector('#welcome-msg').style.display = 'none';
        database
            .collection('users')
            .doc(user.email)
            .get()
            .then(doc => {
                if (doc) {
                    document.querySelector('#user-settings a').innerHTML += " " + doc.data().username;
                } else {
                    console.log('No user found')
                }
            })
            .catch(error => {
                console.log("Error getting user data: ", error);
            });

    }
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
