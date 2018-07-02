// noinspection JSCheckFunctionSignatures
/**
 * Tablet profile
 */
Ext.define('FSS.profile.Tablet', {
    extend: 'Ext.app.Profile',

    xtype: 'fssTabletProfile',
    
    // The name of the initial view to create.
    mainView: 'FSS.view.tablet.main.Main',
    
    isActive: function () {
        return Ext.os.is.Tablet;
    },
    
    launch: function () {
        console.log('Tablet profile launched');
    }
}, function (Cls) {
    Cls.mocks = {
        isActive: {
            returns: 'boolean'
        },
        launch: {}
    };
});