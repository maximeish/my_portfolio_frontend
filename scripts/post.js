document.querySelector('title').innerHTML = "Maxime's Blog";
document.querySelector('#admin-link').style.display = 'none';


let docID = parent.document.URL.substring(parent.document.URL.indexOf('docID='), parent.document.URL.length);
docID =  docID.toString().split('&')[0].split('=')[1];

let userEmail = parent.document.URL.substring(parent.document.URL.indexOf('userEmail='), parent.document.URL.length);
userEmail = userEmail.toString().split('=')[1];
let title = '', paragraphs = '', date_posted = '', imagePath = '', imageRef = '';


console.log('got docID: ', docID);
console.log('got userEmail: ', userEmail);


// Post a comment

async function postComment(event) {
    event.preventDefault();
    let username;

    const userComment = document.querySelector('#user-comment').value;
    database
        .collection('users')
        .doc(userEmail)
        .get()
        .then(doc => {
            console.log(doc);
            username = doc.data().username;
            console.log('user: ', username);
        });

    

}


// End post a comment


document.querySelector('#comment-editor').addEventListener('submit', e => postComment(e));


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
}