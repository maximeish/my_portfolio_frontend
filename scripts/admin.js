//admin board
const tabTitles = document.querySelectorAll('#editor .tab-title');
const tabPanels = document.querySelectorAll('#editor .tab-panel');
// let messagesCount = 0, postsCount = 0;

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


// database functions


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
                    <div class="blog-post">
                        <div>${doc.data().title}</div>
                        <div>${doc.data().paragraph1}</div>
                        <div><i class="fa fa-trash fa-lg"></i></div>
                        <div><i class="fa fa-pencil fa-lg"></i></div>
                    </div>`;
                blogPostsWrapper.appendChild(div);
                // console.log(`${doc.id} - ${JSON.stringify(doc.data())}`);
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
        const paragraph1 = document.querySelector('#paragraph1').value;
        const paragraph2 = document.querySelector('#paragraph2').value || null;
        const paragraph3 = document.querySelector('#paragraph3').value || null;
        const date_posted = document.querySelector('#date_posted').value;
        const filename = document.querySelector('#filename').value;
        if ((title && paragraph1 && date_posted && filename) || paragraph2 || paragraph3) {
            // Add a new document with a generated id.
            database
                .collection("posts")
                .add({
                    title,
                    paragraph1,
                    paragraph2,
                    paragraph3,
                    date_posted,
                    filename
                })
                .then(docRef => console.log("Document written with ID: ", docRef.id))
                .catch(error => console.error("Error adding document: ", error))
        } else {
            console.log('Error: at least profile a title and paragraph1');
        }
    })
}

createPost();

