/**
 * Browser details controller
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.DetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssBrowserDetailsController',
    
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

    /**
     * @protected
     * @private
     * @property {String} detailsUrlTpl
     * Details template url used to create specific league details link
     */
    detailsUrlTpl: 'DETAILS/{0}',

    /**
     * Load details handler loads details for selected league
     * @param {String} leagueId
     * @param {Boolean} isDefault
     */
    onLoadDetails: function(leagueId, isDefault){
        Ext.Ajax.request({
            isFirebase: true,
            url: Ext.String.format(this.detailsUrlTpl, leagueId),
            success: this.loadDetailsSuccess,
            scope: this
        });
        var clsFn = isDefault ? 'addCls' : 'removeCls';
        this.getView().el[clsFn]('fssDefaultLeague');
    },

    /**
     * Load details success handler
     * Receives details response and loads details view
     * @param {FSS.type.ajax.Response} response
     */
    loadDetailsSuccess: function(response){
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
}, function(Cls){
    Cls.mocks = {
        onLoadDetails: {
            args: {
                0: 'string',
                1: 'boolean'
            }
        },
        loadDetailsSuccess: {
            args: {
                0: 'FSS.type.ajax.Response'
            }
        }
    };
});