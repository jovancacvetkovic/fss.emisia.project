/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.profile.Tablet', {
    extend: 'Ext.app.Profile',

    xtype: 'fsstabletProfile',
    
    // The name of the initial view to create.
    mainView: 'FSS.view.tablet.main.Main',
    
    isActive: function () {
        return Ext.os.is.Tablet;
    },
    
    launch: function () {
        console.log('Tablet profile launched');
    }
});