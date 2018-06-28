/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Ext.app.Application',

    name: 'TEST',

    launch: function (application) {
        console.log('___Starting UNIT tests___');
    }
});
