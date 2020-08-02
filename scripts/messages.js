document.addEventListener('DOMContentLoaded', () => {
    // My web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBCejsPq2FVa8DP1N2sVIppWivwBoxWZjY",
        authDomain: "myportfolio-mxm.firebaseapp.com",
        databaseURL: "https://myportfolio-mxm.firebaseio.com",
        projectId: "myportfolio-mxm",
        storageBucket: "myportfolio-mxm.appspot.com",
        messagingSenderId: "712417574909",
        appId: "1:712417574909:web:818cf4f3f208f16fc1e394",
        measurementId: "G-G4FMMPKKC4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // Reference messages collection (or table in RDBMSs)
        var messagesRef = firebase.database().ref('messages');

    // Contact Form 
    // ************

    const form = document.querySelector('#contact-form');

    //return values of each <input>
    const getValues = id => document.querySelector(`#${id}`).value;

    // Submit form
    const submitForm = e => {
        e.preventDefault();

        //get input values
        const name = getValues('name'),  email = getValues('email');
        const phone = getValues('phone'), message = getValues('message');


        //save Message
        saveMessage(name, email, phone, message);

        //alert user that message was successfully sent and hide submit-btn
        document.querySelector('#alert-success').style.display = 'block';
        document.querySelector('#submit-btn').style.display = 'none';

        // hide alert after and show submit-btn after 3s
        setTimeout(() => {
            document.querySelector('#alert-success').style.display = 'none';
            document.querySelector('#submit-btn').style.display = 'block';
            
            document.querySelector('#contact-form').reset();
        }, 3000);
    }

    //Save (send) messages to firebase collection
    const saveMessage = (name, email, phone, message) => {
        var newMessagesRef = messagesRef.push();
        newMessagesRef.set({
            name,
            email,
            phone,
            message
        });
    }
    
    form.addEventListener('submit', submitForm);
});