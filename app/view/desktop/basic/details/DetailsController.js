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
    
    detailsUrlTpl: 'DETAILS/{0}',
    
    onLoadDetails: function(id){
        let dbDetailsUrl = Ext.String.format(this.detailsUrlTpl, id);
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
        
        this.lookup('fssGeneralStats').getController().loadDetails(details);
        this.lookup('fssActivityStats').getController().loadDetails(details);
        this.lookup('fssPersonnelStats').getController().loadDetails(details);
        this.lookup('fssPersonnelOtherStats').getController().loadDetails(details);
    }
});