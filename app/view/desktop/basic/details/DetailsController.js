/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.details.DetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.details',
    
    listen: {
        controller: {
            fssTreeListController: {
                e_loadDetails: 'onLoadDetails'
            }
        }
    },
    
    onLoadDetails: function(url){
        let dbDetailsUrl = Ext.String.format('{0}/details', url);
        let leagues = FSS.firebase.database().ref(dbDetailsUrl);
        leagues.once('value').then(this.loadDetails.bind(this));
    },
    
    loadDetails: function(snapshot){
        //noinspection JSUnresolvedFunction
        let details = snapshot.val();
        let name = details['NAME'];
        let fullName = details['FULL_NAME'];
        let logoUrl = details['LOGO_URL'];
        let bannerUrl = details['BANNER_URL'];
        
        this.getViewModel().set('leagueDetails', {
            name: name,
            fullName: fullName,
            logoUrl: logoUrl,
            bannerUrl: bannerUrl
        });
    }
});