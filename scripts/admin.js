//admin board
const tabTitles = document.querySelectorAll('#editor .tab-title');
const tabPanels = document.querySelectorAll('#editor .tab-panel');

// window.indexedDB.open('firebaseLocalStorageDb', 1)
//     .then(db => {
//         console.log(db)
//     })
//     .catch(err => {
//         console.log(err)
//     })

const showPanel = (panelIndex, colorCode) => {
    tabTitles.forEach(node => {
        node.style.backgroundColor = '';
        node.style.color = '';
    });

    tabTitles[panelIndex].style.backgroundColor = colorCode;
    tabTitles[panelIndex].style.color = '#fefefe';

    tabPanels.forEach(node => {
        node.style.display = 'none';
        node.style.color = '';
    });

    tabPanels[panelIndex].style.display = 'block';
    tabPanels[panelIndex].style.backgroundColor = colorCode;
}

showPanel(0, '#837DD6');


// ** database functions ** //


// Update post


const noRefresh = event => {
    event.preventDefault();
    alert('noRefresh called')
}


const updatePost = event => {
    const id = event.target.id.toString().split('-')[0].split('_')[1];
    console.log('doc id is ', id)
    const docRef = database.collection("posts").doc(id);
    let title, paragraphs, date_posted, filename;
    const wrapper = document.createElement('div');
    const postsWrapper = document.querySelector('#blog-posts');

    
    docRef.get()
        .then(doc => {
            title = doc.data().title;
            author = doc.data().author;
            paragraphs = doc.data().paragraphs;
            date_posted = doc.data().date_posted;
            imageFilename = doc.data().imageFilename;
            wrapper.innerHTML = `
                <div>
                    <div id="successful-update">Post updated successfully</div>
                    <form id="postUpdater" method="POST" action="#" onsubmit="(event) => noRefresh(event)">
                        <div>Title</div><div><input type="text" name="title" id="title_update" value="${title}"></div>
                        <div>Author</div><div><input type="text" name="author" id="author_update" value="${author}"></div>
                        <div>Body</div><div><textarea class="new-body-textarea" rows="27" type="text" name="paragraphs" id="paragraphs_update">${paragraphs}</textarea></div>
                        <div>New image</div><div><input type="file" name="image" id="image_update" /></div>
                        <div><button>Update Post</button></div>
                    </form>
                </div>
            `;
            document.querySelectorAll('.displayMod').forEach(postDiv => postDiv.style.display = 'none');
            
            postsWrapper.prepend(wrapper);

            document.querySelector('#successful-update').style.display = 'none';
            
            document.querySelector('#postUpdater').addEventListener('submit', e => {
                e.preventDefault();
                const title = document.querySelector('#title_update').value || title;
                const author = document.querySelector('#author_update').value || author;
                const paragraphs = document.querySelector('#paragraphs_update').value || paragraphs;
                // const date_posted = date_posted;
                const image = document.querySelector('#image_update').files[0];
                let newImageFilename, imagesRef;
                if (image !== undefined) {
                    newImageFilename = 'posts-images/' + image.name;
                    imagesRef = storageRef.child(newImageFilename);
                }

                if (title && paragraphs && date_posted) {
                    database
                        .collection('posts')
                        .doc(id)
                        .set({
                            title,
                            paragraphs,
                            date_posted,
                            author,
                            imageFilename: newImageFilename || imageFilename
                        })
                        .then(() => {
                            if (image !== undefined) {
                                const existingImageRef = storageRef.child(doc.data().imageFilename);
                                existingImageRef.delete()
                                    .then(() => {
                                        // Image upload
                                        imagesRef.put(image)
                                        .then(() => {
                                            console.log('Document updated successfully');
                                            console.log('Existing image deleted');
                                            console.log('New image uploaded successfully');
                                            location.reload();
                                        })
                                    })
                                    .catch(err => console.log('Error deleting the existing image: ', err));
                            } else {
                                document.querySelector('#successful-update').style.animation = 'fadeInNotification 1s linear 1';

                                document.querySelector('#successful-update').style.display = 'block';

                                setTimeout(() => {
                                    location.reload();
                                }, 2000);
                            }
                        })
                        .catch(err => console.log('Error updating document: ', err));
                } else console.log('Please, fill all the fields')
            });
        }).catch(error => {
            console.log("Error getting document:", error);
        });
}



// delete post

const deletePost = event => {
    database
        .collection('posts')
        .doc(`${(event.target.id).toString().split('_')[1]}`).delete()
        .then(() => {
            console.log('Post successfully deleted')
            location.reload();
        })
        .catch(err => console.log('Error deleting document: ', err));
}

// end of delete post


// delete message

const deleteMessage = event => {
    console.log(`id to delete ${(event.target.id).toString().split('_')[1]}`)
    database
        .collection('messages')
        .doc(`${(event.target.id).toString().split('_')[1]}`).delete()
        .then(() => {
            console.log('Message successfully deleted')
            location.reload();
        })
        .catch(err => console.log('Error deleting document: ', err));
}


// delete message

const deleteUser = event => {
    console.log('not yet implemented')
}




// getting posts

const getPosts = () => {
    database
        .collection('posts')
        .get()
        .then(result => {
            result.forEach(doc => {
                document.querySelector('#posts-count').innerHTML = parseInt(document.querySelector('#posts-count').innerHTML) + 1;
                const blogPostsWrapper = document.querySelector('#blog-posts');
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class='blog-post displayMod' data-identifier="${doc.id}">
                        <div class="post-title">${doc.data().title}</div>
                        <div class="post-body">${doc.data().paragraphs.toString().split(' ').splice(0, 5).join(" ")}...</div>
                        <div><i id="a_${doc.id}" class="fa fa-trash fa-lg fa-danger"></i></div>
                        <div><i id="a_${doc.id}-${doc.id}" class="fa fa-pencil fa-lg"></i></div>
                    </div>`;
                blogPostsWrapper.appendChild(div);
                document.querySelector(`#a_${doc.id}`).addEventListener('click', e => deletePost(e));
                document.querySelector(`#a_${doc.id}-${doc.id}`).addEventListener('click', e => updatePost(e));
            })
        })
        .catch(error => {
            console.log("Error getting posts: ", error);
        });
}

getPosts();

// end of getting posts


// get messages

const getMessages = () => {
    database
        .collection('messages')
        .get()
        .then(result => {
            result.forEach(doc => {
                document.querySelector('#messages-count').innerHTML = parseInt(document.querySelector('#messages-count').innerHTML) + 1;
                const messagesWrapper = document.querySelector('#messages');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${doc.data().name}</td>
                    <td>${doc.data().message}</td>
                    <td>${doc.data().email}</td>
                    <td>${doc.data().phone}</td>
                    <td><i id="a_${doc.id}" class="fa fa-trash fa-lg"></i></td>
                `;
                messagesWrapper.appendChild(row);
                document.querySelector(`#a_${doc.id}`).addEventListener('click', e => deleteMessage(e));
            });
        })
        .catch(error => {
            console.log("Error getting messages: ", error);
        });
}

getMessages();

// end of get messages




// get messages

const getUsers = () => {
    database
        .collection('users')
        .get()
        .then(docs => {
            docs.forEach(doc => {
                document.querySelector('#users-count').innerHTML = parseInt(document.querySelector('#users-count').innerHTML) + 1;
                const usersWrapper = document.querySelector('#users');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${doc.data().username}</td>
                    <td>${doc.id}</td>
                    <td>${doc.data().role}</td>
                    <td><i id="a_${doc.id}" class="fa fa-trash fa-lg"></i></td>
                `;
                usersWrapper.appendChild(row);
                // document.querySelector(`#a_${doc.id}`).addEventListener('click', e => deleteUser(e));
            });
        })
        .catch(error => {
            console.log("Error getting messages: ", error);
        });
}

getUsers();

// end of get messages




// post creator 


const postCreatorForm = document.querySelector('#post-creatorForm');

const createPost = () => {
    postCreatorForm.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const paragraphs = document.querySelector('#paragraphs').value;
        const author = 'Maxime I.';
        const date_posted = new Date();
        const image = document.querySelector('#image').files[0];
        const imageFilename = 'posts-images/' + image.name;
        const imagesRef = storageRef.child(`posts-images/${image.name}`);


        if (title && paragraphs && date_posted && imageFilename) {
            // Add a new document with a generated id.
            database
                .collection("posts")
                .add({
                    title,
                    author,
                    paragraphs,
                    date_posted,
                    imageFilename
                })
                .then(docRef => {
                    // Image upload
                    imagesRef.put(image)
                        .then(result => {
                            console.log("Document written with ID: ", docRef.id);
                            console.log('Image uploaded successfully');
                            location.reload();
                        })
                        .catch(err => console.log('Error uploading image:', err))
                })
                .catch(error => console.error("Error adding document: ", error))
        } else {
            console.log('Error: fill all the fields');
        }
    })
}

createPost();


