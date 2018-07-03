/**
 * Overrides data Connection and adds patch to connect to firebase
 */
Ext.define('FSS.overrides.data.Connection', {
    override: 'Ext.data.Connection',

    request: function (options) {
        if (options.isFirebase) {
            var leagues = FSS.firebase.database().ref(options.url);
            leagues.once('value').then(this.onFirebaseLoaded.bind(this, options));
        }
        else {
            return this.callParent(arguments);
        }
    },

    onFirebaseLoaded: function (options, snapshot) {
        var responseText = snapshot.val();
        if (options.success) {
            options.success.bind(options.scope)({
                success: true,
                responseText: JSON.stringify(responseText)
            });
        }
    }
});