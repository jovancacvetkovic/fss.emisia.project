/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Ext.app.Application',
    require: [
        'Ext.MessageBox'
    ],

    name: 'TEST',

    launch: function (application) {
        console.log('Starting UNIT tests\n');

        window.__karma__.loaded = window.onKarmaLoaded;
        window.__karma__.loaded();
    }
});
