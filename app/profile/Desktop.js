// noinspection JSCheckFunctionSignatures
/**
 * Desktop profile
 */
Ext.define('FSS.profile.Desktop', {
    extend: 'Ext.app.Profile',

    xtype: 'fssDesktopProfile',

    // The name of the initial view to create.
    mainView: 'FSS.view.desktop.main.Main',

    isActive: function () {
        return Ext.os.is.Desktop;
    },

    launch: function () {
        console.log('Desktop profile launched');
    }
}, function (Cls) {
    Cls.mocks = {
        isActive: {
            returns: 'boolean'
        },
        launch: {}
    };
});