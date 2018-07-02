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

    launch: function () {
        this.callParent(arguments);

        var localeUrl = FSS.Locale.getLocaleUrl();
        FSS.Locale.loadLocales(localeUrl);
    },

    onUnmatchedRoute: function (hash) {
        Logger.error('Route ' + hash + ' not found');
    },

    /**
     * @inheritDoc
     */
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
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
    onProfilesReady: function () {
        // Init firebase
        FSS.firebase = firebase; // jshint ignore:line

        // Hide loading logo
        Ext.getBody().down('#pulse-logo').hide();

        Ext.Ajax.request({
            url: 'firebase-config.json',
            success: this.initMessaging.bind(this)
        });
    },

    /**
     * Initialize firebase push notifications
     *
     * NOTE: After firebase initialization app startup will be continued
     * @param {FSS.type.ajax.Response} response
     * @param {FSS.type.ajax.Options} options
     */
    initMessaging: function (response, options) { // jshint ignore:line
        let responseText = response.responseText;
        let config = Ext.JSON.decode(responseText);

        //noinspection JSUnresolvedFunction
        let firebase = config.firebase;

        //noinspection JSUnresolvedFunction
        FSS.firebase.initializeApp(firebase); // Init firebase app

        // Initialize firebase database
        FSS.database = FSS.firebase.database().ref(); // jshint ignore:line

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

        // Continue with app startup
        this.superclass.superclass.onProfilesReady.call(this);
    },

    /**
     * Denied permissions handler
     * @param error
     */
    onDenyPermissions: function (error) {
        Logger.error('Messaging permissions denied by user. User will not be able to see push notifications for this application.');
    },

    /**
     * Firebase token handler. Save token for authentication
     * @param {String} token
     */
    onFirebaseToken: function (token) {
        // Save firebase token
        Logger.info('Firebase token: ', token);
    },

    /**
     * Granted user permissions handler
     * @return {String}
     */
    onGrantPermissions: function () {
        Logger.info('Messaging permissions granted by user.');
        return FSS.messaging.getToken(); // Return firebase token for authentication
    },

    /**
     * Push notifications handler. Test weather browser supports notification and show message
     * @param {FSS.type.PushMessage} pushMessage
     */
    onMessageHandler: function (pushMessage) {
        new FSS.Notification(pushMessage.notification.title, pushMessage.notification);
    }
}, function(Cls){
    Cls.mocks = {
        onDenyPermissions: {
            args: {
                0: 'object'
            }
        },
        onFirebaseToken: {
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
});
