//admin board
const tabTitles = document.querySelectorAll('#editor .tab-title');
const tabPanels = document.querySelectorAll('#editor .tab-panel');

const showPanel = (panelIndex, colorCode) => {
    tabTitles.forEach(node => {
        node.style.backgroundColor = '';
        node.style.color = '';
    });

    tabTitles[panelIndex].style.backgroundColor = colorCode;
    tabTitles[panelIndex].style.color = '#222';

    tabPanels.forEach(node => {
        node.style.display = 'none';
        node.style.color = '';
    });

    tabPanels[panelIndex].style.display = 'block';
    tabPanels[panelIndex].style.backgroundColor = colorCode;
}

showPanel(0, '#C5CC5D');


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
            paragraphs = doc.data().paragraphs;
            date_posted = doc.data().date_posted;
            filename = doc.data().filename;
            wrapper.innerHTML = `
                <div>
                    <form id="postUpdater" method="POST" action="#" onsubmit="(event) => noRefresh(event)">
                        <div>Title</div><div><input type="text" name="title" id="title_update" value="${title}"></div>
                        <div>Paragraphs</div><div><textarea rows="5" type="text" name="paragraphs" id="paragraphs_update">${paragraphs}</textarea></div>
                        <div>New image</div><div><input type="file" name="image" id="image_update" /></div>
                        <div>Date posted</div><div><input type="datetime-local" name="date_posted" id="date_posted_update" value="${date_posted}"></div>
                        <div>File name</div><div><input type="text" name="filename" id="filename_update" value="${filename}"></div>
                        <div><button>Update Post</button></div>
                    </form>
                </div>
            `;
            document.querySelectorAll('.displayMod').forEach(postDiv => postDiv.style.display = 'none');
            
            postsWrapper.prepend(wrapper);
            
            document.querySelector('#postUpdater').addEventListener('submit', e => {
                e.preventDefault();
                const title = document.querySelector('#title_update').value;
                const paragraphs = document.querySelector('#paragraphs_update').value;
                const date_posted = document.querySelector('#date_posted_update').value;
                const filename = document.querySelector('#filename_update').value;
                const image = document.querySelector('#image_update').files[0];
                const newImageFilename = 'posts-images/' + image.name;
                const imagesRef = storageRef.child(newImageFilename);

                if (title && paragraphs && date_posted && filename) {
                    database
                        .collection('posts')
                        .doc(id)
                        .set({
                            title,
                            paragraphs,
                            date_posted,
                            filename,
                            imageFilename: newImageFilename
                        })
                        .then(() => {
                            if (image) {
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
        .then(() => console.log('Post successfully deleted'))
        .catch(err => console.log('Error deleting document: ', err));
}

// end of delete post


// getting posts

let count = 0;
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
                        <div>${doc.data().title}</div>
                        <div>${doc.data().paragraphs.toString().split(' ').splice(0, 5).join(" ")}...</div>
                        <div><i id="a_${doc.id}" class="fa fa-trash fa-lg"></i></div>
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
                `;
                messagesWrapper.appendChild(row);
            });
        })
        .catch(error => {
            console.log("Error getting messages: ", error);
        });
}

getMessages();

// end of get messages


// post creator 


const postCreatorForm = document.querySelector('#post-creatorForm');

const createPost = () => {
    postCreatorForm.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const paragraphs = document.querySelector('#paragraphs').value;
        const date_posted = document.querySelector('#date_posted').value;
        const image = document.querySelector('#image').files[0];
        const imageFilename = 'posts-images/' + image.name;
        const imagesRef = storageRef.child(`posts-images/${image.name}`);


        if (title && paragraphs && date_posted && filename && imageFilename) {
            // Add a new document with a generated id.
            database
                .collection("posts")
                .add({
                    title,
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
                        })
                        .catch(err => console.log('Error uploading image:', err))
                })
                .catch(error => console.error("Error adding document: ", error))
        } else {
            console.log('Error: fill all the fields');
        }
    
        console.log(image, image.name);
    })
}

createPost();


