
    // Reference messages collection (or table in RDBMSs)
    //var messagesRef = firebase.database().ref('messages');

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

        //add fade in effects to sections
        ['#alert-success', '#submit-btn', '.small-title'].forEach((section, index) => {
            if (document.querySelector(section).style.animation)
                document.querySelector(section).style.animation = `sectionFadeIn 0.5s ease-in-out forwards ${index / 7}s`;
            else 
                document.querySelector(section).style.animation = `sectionFadeIn 0.5s ease-in-out forwards ${index / 7}s`;
        });

        //alert user that message was successfully sent and hide submit-btn
        document.querySelector('#alert-success').style.display = 'block';
        document.querySelector('#submit-btn').style.display = 'none';
        document.querySelector('#submit-btn').style.opacity = 0;
        document.querySelector('.small-title').style.display = 'none';
        document.querySelector('.small-title').style.opacity = 0;

        // hide alert after and show submit-btn after 3s
        setTimeout(() => {
            document.querySelector('#alert-success').style.display = 'none';
            document.querySelector('#submit-btn').style.display = 'block';
            document.querySelector('.small-title').style.display = 'block';

            
            document.querySelector('#contact-form').reset();
        }, 5000);
    }

    //Save (send) messages to firebase collection
    const saveMessage = (name, email, phone, message) => {

        database.collection('messages')
            .add({
                name,
                email,
                phone,
                message
            })
            .then(docRef => console.log("Document written with ID: ", docRef.id))
            .catch(err => console.error("Error adding document: ", err))
    }
    
    form.addEventListener('submit', submitForm);
    
    // document.querySelector('#show').addEventListener('click', () => {
    //     database
    //         .collection("messages")
    //         .get()
    //         .then(querySnapshot => {
    //             querySnapshot.forEach(doc => console.log({ id: doc.id, ...doc.data() }));
    //         });
    // })