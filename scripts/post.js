document.querySelector('title').innerHTML = "Maxime's Blog";
document.querySelector('#admin-link').style.display = 'none';


let docID = parent.document.URL.substring(parent.document.URL.indexOf('docID='), parent.document.URL.length);
docID =  docID.toString().split('&')[0].split('=')[1];

let userEmail = parent.document.URL.substring(parent.document.URL.indexOf('userEmail='), parent.document.URL.length);
userEmail = userEmail.toString().split('=')[1];
let title = '', paragraphs = '', date_posted = '', imagePath = '', imageRef = '';


console.log('got docID: ', docID);
console.log('got userEmail: ', userEmail);

// Load comments as post page loads
async function loadComments() {
    const commentsWrapper = document.querySelector('#users-comments');
    database
        .collection("comments")
        // .doc(docID)
        .get()
        .then(docSnapshot => {
            docSnapshot.forEach(doc => {
                if (doc.data().postID === docID) {
                    const div = document.createElement('div');
                    let date = doc.data().date_posted.toString().split('T')[0] + ' at ' + doc.data().date_posted.toString().split('T')[1];
                    div.innerHTML = `
                        <div class="comment-grid">
                            <div class="user-image">
                                <img src="../../assets/img/user-pictures/user.png" alt="Guest">
                            </div>
                            <div class="user-name">${doc.data().username}</div>
                            <div class="user-comment">${doc.data().message}</div>
                            <div class="date-posted">${date}</div>
                            <div class="like-count">${doc.data().likes} likes</div>
                            <div class="like-btn">
                                <a id="like-btn"><i class="fa fa-thumbs-up"></i> Like</a>
                            </div>
                        </div>
                    `;
                    commentsWrapper.appendChild(div);
                }
            });
        })
        .catch(err => {
            console.log('Unable to retrieve comments: ', err);
        })
}

loadComments();


// End load comments



// Post a comment

async function postComment(event) {
    event.preventDefault();
    let username;
    let date = new Date();
    date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + '-' + date.getMinutes();
    let likes = 0;
    const userComment = document.querySelector('#user-comment').value;
    
    database
        .collection('users')
        .doc(userEmail)
        .get()
        .then(doc => {
            username = doc.data().username;
                if (userComment) {
                    database
                        .collection("comments")
                        .add({
                            postID: docID,
                            date_posted: date,
                            likes: likes,
                            message: userComment,
                            username: username
                        });
                } else console.log("you can't submit an empty comment");
        })
        .catch (err => console.log('Unable to post comment: ', err));
}

document.querySelector('#comment-editor').addEventListener('submit', e => postComment(e));

// End post a comment



// fetch data

database
    .collection('posts')
    .doc(docID)
    .get()
    .then(doc => {
        title = doc.data().title;
        document.querySelector('title').innerHTML = title;
        paragraphs = doc.data().paragraphs;
        date_posted = doc.data().date_posted;
        display_date = date_posted.toString().split('T')[0] + ' at ' + date_posted.toString().split('T')[1];
        imagePath = doc.data().imageFilename;
        imageRef = storageRef.child(imagePath);

        imageRef.getDownloadURL().then(url => {
            document.querySelector('#image').innerHTML = `
                <img src="${url}" alt="" />
            `;
          }).catch(error => {
              console.log('Error downloading image: ', error);
          })

        document.querySelector('#title').innerHTML = title;
        document.querySelector('#date-posted').innerHTML = `Posted by Maxime I. on ${display_date}`;
        document.querySelector('#paragraphs').innerHTML = paragraphs;
    })
    .catch(err => console.log('Error getting document: ', err));

// authentication

// styles if user is logged in
if (userEmail && userEmail != null && userEmail != 'null') {
    document.querySelector('#auth-logout a').style.display = 'none';
    document.querySelector('#login-auth-logout a').style.display = 'none';
    document.querySelector('#auth-logout').innerHTML = '<button><i id="auth-resets" class="fa fa-sign-out"></i>&nbsp;Logout</button>';
    document.querySelector('#auth-logout button').addEventListener('click', () => {
        firebase.auth().signOut();
        window.location.href = `./post.html?docID=${docID}&userEmail=${null}`;
    });

    const prom = new Promise((resolve, reject) => {
        if (userEmail === 'mxmishimwe5@gmail.com') {
            resolve('admin');
        } else {
            reject('not admin');
        }
    })
    prom.then(() => {
        document.querySelector('#admin-link').style.display = 'block';
    }).catch(() => {
        console.log('welcome user');
    });
} else {
    //styles if user is not logged in
    document.querySelector('#comment').style.display = 'none';
}

