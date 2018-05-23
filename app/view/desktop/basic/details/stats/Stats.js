/**
 * Created by emisia on 5/22/18.
 */
Ext.define('FSS.view.desktop.basic.details.stats.Stats', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.layout.HBox',
        'FSS.view.desktop.basic.details.stats.StatsController',
        'FSS.view.desktop.basic.details.stats.StatsModel'
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
    
    itemTpl: [
        '<div class="fssDetailsStatsItemLabel">{label}</div>',
        '<div class="fssDetailsStatsItemText">{text}</div>'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    items: []
});