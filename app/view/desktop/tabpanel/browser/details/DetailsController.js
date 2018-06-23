/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.DetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.details',
    
    requires: [
        'FSS.util.Util'
    ],
    
    listen: {
        controller: {
            fssTreeListController: {
                e_loadDetails: 'onLoadDetails'
            }
        }
    },
    
    detailsUrlTpl: 'DETAILS/{0}',
    
    onLoadDetails: function(id, defaultLeague){
        var dbDetailsUrl = Ext.String.format(this.detailsUrlTpl, id);
        var leagues = FSS.firebase.database().ref(dbDetailsUrl);
        leagues.once('value').then(this.loadDetails.bind(this));

        var clsFn = defaultLeague ? 'addCls' : 'removeCls';
        debugger;
        this.getView().el[clsFn]('fssDefaultLeague');
    },
    
    loadDetails: function(snapshot){
        //noinspection JSUnresolvedFunction
        var details = snapshot.val();
        this.getViewModel().set('leagueDetails', {
            name: FSS.Util.safeGet(details, 'NAME'),
            fullName: FSS.Util.safeGet(details, 'FULL_NAME'),
            logoUrl: FSS.Util.safeGet(details, 'LOGO_URL'),
            bannerUrl: FSS.Util.safeGet(details, 'BANNER_URL')
        });
        
        this.lookup('fssGeneralStats').getController().loadDetails(details);
        this.lookup('fssActivityStats').getController().loadDetails(details);
        this.lookup('fssPersonnelStats').getController().loadDetails(details);
        this.lookup('fssPersonnelOtherStats').getController().loadDetails(details);
    }
});