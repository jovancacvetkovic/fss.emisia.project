//noinspection JSUnusedLocalSymbols
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('FSS.Application', {
    extend: 'Ext.app.Application',
    
    name: 'FSS',
    
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    
    /**
     * @inheritDoc
     */
    onAppUpdate: function(){
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice){
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    
    /**
     * On application launch handler
     * Firebase: registers firebase application GCM (Google Cloud Messaging, eg Push Notifications)
     * Initializes firebase sub-application
     * Initializes messaging for push notifications
     * Requests user to allow push notifications
     */
    launch: function(){
        // Init firebase
        FSS.firebase = firebase; // jshint ignore:line
        
        Ext.Ajax.request({
            url: 'resources/config',
            success: this.initMessaging.bind(this)
        });
    },
    
    /**
     * Initialize firebase push notifications
     * @param {FSS.type.ajax.Response} response
     * @param {FSS.type.ajax.Options} options
     */
    initMessaging: function(response, options){ // jshint ignore:line
        var responseText = response.responseText;
        var config = Ext.JSON.decode(responseText);
        
        //noinspection JSUnresolvedFunction
        var firebase = config.firebase;
        //noinspection JSUnresolvedFunction
        FSS.firebase.initializeApp(firebase);
        
        // Init messaging
        FSS.messaging = FSS.firebase.messaging();
        
        // Register public api key for messaging
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        FSS.messaging.usePublicVapidKey(firebase.vapidKey);
        
        // Request used to allow notifications
        FSS.messaging.requestPermission()
            .then(this.onGrantPermissions)
            .then(this.onFirebaseToken)
            .catch(this.onDenyPermissions);
        
        if (Notification) { // Test push notifications support
            FSS.Notification = Notification;
        }
        
        if (FSS.Notification) {
            FSS.messaging.onMessage(this.onMessageHandler.bind(this));
        }
        else {
            console.error('Push Notifications are not supported by browser.');
        }
    },
    
    /**
     * Denied permissions handler
     * @param error
     */
    onDenyPermissions: function(error){
        console.error('Messaging permissions denied by user. User will not be able to see push notifications for this application.');
    },
    
    /**
     * Firebase token handler. Save token for authentication
     * @param {String} token
     */
    onFirebaseToken: function(token){
        // Save firebase token
        console.log('Firebase token: ', token);
    },
    
    /**
     * Granted user permissions handler
     * @return {String}
     */
    onGrantPermissions: function(){
        console.log('Messaging permissions granted by user.');
        return FSS.messaging.getToken(); // Return firebase token for authentication
    },
    
    /**
     * Push notifications handler. Test weather browser supports notification and show message
     * @param {FSS.type.PushMessage} pushMessage
     */
    onMessageHandler: function(pushMessage){
        new FSS.Notification(pushMessage.notification.title, pushMessage.notification);
    }
});
