/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.details.Details', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.basic.containerimage.ContainerImage',
        'FSS.view.desktop.basic.details.DetailsController',
        'FSS.view.desktop.basic.details.DetailsModel',
        'FSS.view.desktop.basic.details.banner.Banner',
        'FSS.view.desktop.basic.details.stats.Stats'
    ],

    xtype: 'fssDetails',

    viewModel: {
        type: 'details'
    },

    cls: 'fssDetails',
    
    controller: 'details',

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