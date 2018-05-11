importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyD_GzRKOA-HPHff4z0Sgj9WLGhbeRvmpZ4",
    authDomain: "fssmodern.firebaseapp.com",
    projectId: "fssmodern",
    messagingSenderId: "939280745280"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
    debugger;
    const title = "Background message";
    const options = {
        body: payload.data.status
    };
    
    return self.registration.showNotification(title, options);
});

/*

curl -X POST -H "Authorization: key=AAAA2rF-w0A:APA91bG7_yrIJcWOE8n2wacDBl7IFUreyjYXC6P-UYdOld6KtPPB9551u24FNjsJ8AQDAAuUcyDN6VpRrNa3qAegfPSJ0AmIztz0009vzOou78ZLlxfpkKdJ68fVTRjMYBT_tf9hp-_D" -H "Content-Type: application/json" -d '{"notification": {"title": "Firebase","body": "Push notification test","icon": "firebase-logo.png","click_action": "http://localhost:1841/"},"to": "c525hymWLBc:APA91bG3YkumQ1iHOzt0WahpIZJ1qFm8JWXmiQEV4tko-FRt8W5PAiic5gMG6s5aUo8a6WSa22NrJx-yfr_PdBIHBhZDsC-66xMLYPsHd-wLqZ7yEhcAJPdiq6a-Slwyx8rGdmopxpjG"}' "https://fcm.googleapis.com/fcm/send"

 */