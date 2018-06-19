/**
 * Created by emisia on 5/21/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.banner.Banner', {
    extend: 'Ext.Container',
    
    requires: [
        'Ext.Img',
        'Ext.layout.HBox',
        'FSS.view.desktop.tabpanel.browser.details.banner.BannerController',
        'FSS.view.desktop.tabpanel.browser.details.banner.BannerModel'
    ],
    
    xtype: 'fssDetailsBanner',
    
    viewModel: {
        type: 'fssDetailsBannerModel'
    },
    
    config: {
        details: undefined
    },
    
    controller: 'fssDetailsBannerController',
    
    cls: 'fssDetailsBanner',
    
    layout: 'hbox',
    
    items: [{
        xtype: 'image',
        cls: 'bannerLogo',
        bind: {
            src: '{leagueDetails.logoUrl}'
        }
    }, {
        cls: 'bannerBody',
        flex: 1,
        items: [{
            cls: 'bannerText',
            flex: 1,
            items: [{
                cls: 'bannerFullName',
                bind: {
                    html: '{leagueDetails.fullName}'
                }
            }, {
                cls: 'bannerName',
                bind: {
                    html: '{leagueDetails.name}'
                }
            }]
        }]
    }, {
        cls: 'bannerRightSide'
    }]
});