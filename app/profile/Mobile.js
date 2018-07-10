// noinspection JSCheckFunctionSignatures
/**
 * Mobile profile
 */
Ext.define('FSS.profile.Mobile', {
    extend: 'Ext.app.Profile',

    xtype: 'fssMobileProfile',

    isMobile: true,

    // The name of the initial view to create.
    mainView: 'FSS.view.mobile.main.Main',

    isActive: function () {
        return Ext.os.is.Phone;
    },

    launch: function () {
        console.log('Mobile profile launched');
    }
}, function (Cls) {
    Cls.mocks = {
        isActive: {
            returns: 'boolean'
        },
        launch: {}
    };
});