database
    .collection('posts')
    .get()
    .then(result => {
        result.forEach(doc => {
            const postsWrapper = document.querySelector('.posts-wrapper');
            const div = document.createElement('div');
            const date = doc.data().date_posted;
            div.innerHTML = `
                <h2>${doc.data().title}</h2>
                <span>Posted on ${date.toString().split('T')[0]} at ${date.toString().split('T')[1]} by Maxime I.</span>
                <p>${doc.data().paragraphs.toString().split(' ').splice(0, 10).join(' ')}...</p>
                <a href="./posts/${doc.data().filename}">Read more</a>
            `;
            div.classList.add('post');
            postsWrapper.appendChild(div);
        });
    })

