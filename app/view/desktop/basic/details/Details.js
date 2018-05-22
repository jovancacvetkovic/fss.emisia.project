/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.details.Details', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.basic.details.DetailsController',
        'FSS.view.desktop.basic.details.DetailsModel',
        'FSS.view.desktop.basic.details.banner.Banner'
    ],

    xtype: 'fssDetails',

    viewModel: {
        type: 'details'
    },

    cls: 'fssDetails',
    
    controller: 'details',

    items: [{
        cls: 'fssDetailsHeader',
        
        items: [{
            cls: 'flexer'
        }, {
            xtype: 'fssDetailsBanner',
            bind: {
                details: '{leagueDetails}'
            }
        }]
    }, {
        cls: 'fssDetailsBody'
    }]
});