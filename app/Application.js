//noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('FSS.Application', {
    extend: 'Ext.app.Application',
    
    require: [
        'FSS.util.Localization',
        'FSS.util.Logger',
        'FSS.util.Util',
        'Ext.util.History',
        
        'FSS.store.Localization'
    ],
    
    name: 'FSS',
    
    quickTips: false,
    
    defaultToken: 'FSS',
    
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    
    listen: {
        global: {
            unmatchedroute: 'onUnmatchedRoute'
        }
    },
    
    launch: function(){
        this.callParent(arguments);
        
        var localeUrl = FSS.Locale.getLocaleUrl();
        FSS.Locale.loadLocales(localeUrl);
        
        Ext.History.init();
    },
    
    onUnmatchedRoute: function(hash){
        this.redirectTo('FSS');
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
     *
     * NOTE: This will stop app initialization and continue after firebase iz initialized
     */
    onProfilesReady: function(){
        // Init firebase
        FSS.firebase = firebase; // jshint ignore:line
        
        // Hide loading logo
        Ext.getBody().down('#fss-loader').hide();
        
        Ext.Ajax.request({
            url: 'firebase-config.json',
            success: this.initMessaging.bind(this)
        });
    },
    
    /**
     * Fetch firebase error and log result
     * @param error
     */
    getFirebaseTokenFailure: function(error){
        Logger.error('Unable to retrieve refreshed token ', error);
    },
    
    /**
     * Retrieves firebase token
     */
    getFirebaseToken: function(){
        FSS.messaging.getToken().then(this.saveFirebaseToken).catch(this.getFirebaseTokenFailure);
    },
    
    /**
     * Saves firebase token locally
     * @param {String} token
     */
    saveFirebaseToken: function(token){
        Logger.info('Token refreshed: ' + token);
        localStorage.setItem('firebase-token', token);
    },
    
    /**
     * Initialize firebase push notifications
     *
     * NOTE: After firebase initialization app startup will be continued
     * @param {FSS.type.ajax.Response} response
     * @param {FSS.type.ajax.Options} options
     */
    initMessaging: function(response, options){ // jshint ignore:line
        let responseText = response.responseText;
        let config = Ext.JSON.decode(responseText);
        
        FSS.firebase = firebase; // jshint ignore:line
        
        //noinspection JSUnresolvedFunction
        FSS.fireapp = FSS.firebase.initializeApp(config.firebase); // Init firebase app
        
        // Initialize firebase database
        FSS.database = FSS.fireapp.database().ref(); // jshint ignore:line
        
        // Init messaging
        FSS.messaging = FSS.fireapp.messaging();
        FSS.messaging.usePublicVapidKey(config.firebase.vapidKey);
        
        // Request used to allow notifications
        FSS.messaging.requestPermission()
            .then(this.onGrantPermissions)
            .then(this.saveFirebaseToken)
            .catch(this.onDenyPermissions);
        
        if (Notification) { // Test push notifications support
            FSS.Notification = Notification;
        }
        
        // retrieve initial firebase token
        this.getFirebaseToken();
        FSS.messaging.onTokenRefresh(this.getFirebaseToken);
        
        if (FSS.Notification) {
            FSS.messaging.onMessage(this.onMessageHandler.bind(this));
        }
        else {
            Logger.error('Push Notifications are not supported by browser.');
        }
        
        // Continue with app startup
        this.superclass.superclass.onProfilesReady.call(this);
    },
    
    /**
     * Denied permissions handler
     * @param error
     */
    onDenyPermissions: function(error){
        Logger.error('Messaging permissions denied by user. User will not be able to see push notifications for this application.');
    },
    
    /**
     * Granted user permissions handler
     * @return {String}
     */
    onGrantPermissions: function(){
        Logger.info('Messaging permissions granted by user.');
        return FSS.messaging.getToken(); // Return firebase token for authentication
    },
    
    /**
     * Push notifications handler. Test weather browser supports notification and show message
     * @param {FSS.type.PushMessage} pushMessage
     */
    onMessageHandler: function(pushMessage){
        new FSS.Notification(pushMessage.notification.title, pushMessage.notification);
    }
}, function(Cls){
    Cls.mocks = {
        onDenyPermissions: {
            args: {
                0: 'object'
            }
        },
        saveFirebaseToken: {
            args: {
                0: 'string'
            }
        },
        onGrantPermissions: {
            returns: 'string'
        },
        onMessageHandler: {
            args: {
                0: 'FSS.type.PushMessage'
            }
        }
    };
    
    /**
     * Firebase test message/notification
     * Note: This function is used only for development testing notifications
     */
    Cls.testMessage = function(message){
        Ext.Ajax.request({
            url: 'https://fcm.googleapis.com/fcm/send',
            defaultHeaders: {
                Authorization: 'key=AAAA2rF-w0A:APA91bG7_yrIJcWOE8n2wacDBl7IFUreyjYXC6P-UYdOld6KtPPB9551u24FNjsJ8AQDAAuUcyDN6VpRrNa3qAegfPSJ0AmIztz0009vzOou78ZLlxfpkKdJ68fVTRjMYBT_tf9hp-_D'
            },
            jsonData: {
                notification: Ext.apply({
                    title: 'Firebase',
                    body: 'Push notification test',
                    icon: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApa47/MXCR/xVbgP8pa43/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZqjv+2ud3/EAa6////////////EAa6//////8qbo//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACxsjf8RBb3/EAa6/xAGuv///////////xAGuv8QBrr/EQXA/y9sk/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/Pv/QkLC///8+P8QBrr///////////8QBrr////7/+7u9v/7+/j/AAAAAAAAAAAAAAAAAAAAAAAAAAAnaY3/EAa6/xMJvf+Ihtz/EAa6////////////EAa6/wUAtP8QBL7/EAa6/x5nkPcAAAAAAAAAAAAAAAAAAAAAKmuP/xAGuv9QUMr/EQa6/21uyf8maY3/TYWg/wUCsf8SBrr/PUHA/xAGuv8obJH/AAAAAAAAAAAAAAAAAAAAACprj/8YGLL/GBiy/xgYtP//////KmyP//z///8laIz/GBiy/xgYsv8YGLL/KGyR/wAAAAAAAAAAAAAAAAAAAAAqa4//////////////////8//+/xVbgv//////Wo2l/////////////////yhskf8AAAAAAAAAAAAAAAAAAAAAKmuP/7Kx6f+ysen/rarp/xxlif//////KWuO//j9+/+ysOn/srHp/7Kx6f8obJH/AAAAAAAAAAAAAAAAAAAAACprj/8QBrr/EAa6/xAGuv/8/ff//v3+/////f///vz/EAa6/xAGuv8QBrr/KGyR/wAAAAAAAAAAAAAAAAAAAAAqa4//EAa6/xAHuf+Kh9b/EAa6////////////EAa6/wYAsv8RB7r/EAa6/yhskf8AAAAAAAAAAAAAAAAAAAAAKmuP/xAGuv8QBrr/iITc/xAGuv///////////xAGuv8FAbT/Dwa6/xAGuv8pa5D/AAAAAAAAAAAAAAAAAAAAACprj/8QBrr/EAa6/xAGuv8QBrr///////////8QBrr/EAa6/xAGuv8QBrr/KWuQ/wAAAAAAAAAAAAAAAAAAAAAqa4//FhWw/xYVsP8WFbD/FhWw////////////FhWw/xYVsP8WFbD/FhWw/ylrkP8AAAAAAAAAAAAAAAAAAAAAKmuP/yBiiP+pwc7/KWyO/97p7P/7/v7/L2eM/9vj7/8eZIf/Fl2I//n7/f8pa5D/AAAAAAAAAAAAAAAAAAAAACprj//w9ff/+fv8/3Sesf//////5e3w/2aRqP//////jrDB/ylrjv8pa47/KWuQ/wAAAAAAAAAA/D8AAPAPAADgBwAA4AcAAMADAADAAwAAwAMAAMADAADAAwAAwAMAAMADAADAAwAAwAMAAMADAADAAwAAwAMAAA==',
                    click_action: 'http://localhost:1841/'
                }, message || {}),
                to: localStorage.getItem('firebase-token')
            }
        });
    }
});