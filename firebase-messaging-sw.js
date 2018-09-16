importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

firebase.initializeApp({
    "apiKey": "AIzaSyD_GzRKOA-HPHff4z0Sgj9WLGhbeRvmpZ4",
    "authDomain": "fssmodern.firebaseapp.com",
    "databaseURL": "https://fssmodern.firebaseio.com",
    "projectId": "fssmodern",
    "storageBucket": "fssmodern.appspot.com",
    "messagingSenderId": "939280745280",
    "vapidKey": "BJx3maNMrM5NOJyJlmojvtJ_35mDgr6C1ZSOnwcSTeZgiOuJQDtFgnLGi_oJBAh0ipKjPOldhbFaYP6MMxz4lMc"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
    const title = "Background message";
    const options = {
        body: payload.data.status
    };
    
    return self.registration.showNotification(title, options);
});