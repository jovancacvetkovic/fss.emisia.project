/**
 * Browser details controller
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
        Ext.Ajax.request({
            isFirebase: true,
            url: Ext.String.format(this.detailsUrlTpl, id),
            success: this.loadDetails,
            scope: this
        });
        var clsFn = defaultLeague ? 'addCls' : 'removeCls';
        this.getView().el[clsFn]('fssDefaultLeague');
    },
    
    loadDetails: function(response){
        //noinspection JSUnresolvedFunction
        var details = JSON.parse(response.responseText);

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