/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.profile.Mobile', {
    extend: 'Ext.app.Profile',

    xtype: 'fssMobileProfile',
    
    // The name of the initial view to create.
    mainView: 'FSS.view.mobile.main.Main',
    
    isActive: function () {
        return Ext.os.is.Phone;
    },
    
    launch: function () {
        console.log('Mobile profile launched');
    }
});