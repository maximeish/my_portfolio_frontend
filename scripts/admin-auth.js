firebase.auth().onAuthStateChanged(user => {
    if(user) {
    	database
			.collection('users')
			.doc(user.email)
			.get()
			.then(doc => {
				if (doc.data().role !== 'admin') {
					alert("You are not allowed to view this page");
					firebase.auth().signOut();
					window.location.href = './blog.html';
				}
			})
	        .catch(error => {
	            alert("Error getting verifying admin auth: ", error);
	            firebase.auth().signOut();
	            window.location.href = './blog.html';
	        });
    } else {
    	alert('Not authorized')
    	firebase.auth().signOut();
    	window.location.href = './blog.html';
    }
});