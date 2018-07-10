/**
 * Desktop browser details panel
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.Details', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.tabpanel.browser.ContainerImage',
        'FSS.view.desktop.tabpanel.browser.details.DetailsController',
        'FSS.view.desktop.tabpanel.browser.details.DetailsModel',
        'FSS.view.desktop.tabpanel.browser.details.banner.Banner',
        'FSS.view.desktop.tabpanel.browser.details.stats.Stats'
    ],

    xtype: 'fssDetails',

    viewModel: {
        type: 'details'
    },

    cls: 'fssDetails',
    
    controller: 'details',
    
    scrollable: 'y',
    
    items: [{
        xtype: 'fssContainerImage',
        cls: 'fssDetailsHeader',
    
        bind: {
            src: '{leagueDetails.bannerUrl}'
        },
        
        items: [{
            cls: 'flexer'
        }, {
            xtype: 'fssDetailsBanner',
            bind: {
                details: '{leagueDetails}'
            }
        }]
    }, {
        xtype: 'fssDetailsStats',
        reference: 'fssGeneralStats',
        refName: 'GENERAL'
    }, {
        xtype: 'fssDetailsStats',
        reference: 'fssPersonnelStats',
        header: true,
        refName: 'PERSONNEL.GENERAL'
    }, {
        xtype: 'fssDetailsStats',
        reference: 'fssPersonnelOtherStats',
        refName: 'PERSONNEL.OTHER'
    }, {
        xtype: 'fssDetailsStats',
        reference: 'fssActivityStats',
        header: true,
        refName: 'ACTIVITY'
    }]
});