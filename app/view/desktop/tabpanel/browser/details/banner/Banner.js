/**
 * Browser tab top banner view
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.banner.Banner', {
    extend: 'Ext.Container',

    requires: [
        'Ext.Img',
        'Ext.layout.HBox'
    ],

    xtype: 'fssDetailsBanner',

    config: {
        details: undefined
    },

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