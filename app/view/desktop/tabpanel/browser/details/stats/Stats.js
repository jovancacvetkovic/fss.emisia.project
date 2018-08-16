/**
 * Browser details statistics panel
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.stats.Stats', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.layout.HBox',
        'FSS.view.desktop.tabpanel.browser.details.stats.StatsController',
        'FSS.view.desktop.tabpanel.browser.details.stats.StatsModel'
    ],

    xtype: 'fssDetailsStats',

    viewModel: {
        type: 'fssDetailsStatsModel'
    },

    controller: 'fssDetailsStatsController',
    
    cls: 'fssDetailsStats',
    
    config: {
        stats: []
    },

    bind: {
        locale: '{locale}'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    items: []
});