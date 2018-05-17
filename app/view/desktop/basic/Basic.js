/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.Basic', {
    extend: 'Ext.Container',

    requires: [
        'Ext.layout.HBox',
        'FSS.view.desktop.basic.BasicController',
        'FSS.view.desktop.basic.BasicModel',
        'FSS.view.desktop.basic.details.Details',
        'FSS.view.desktop.basic.treelist.TreeList'
    ],

    viewModel: {
        type: 'basicModel'
    },

    cls: 'fssBasic',
    
    controller: 'basicController',

    layout: {
        type: 'hbox'
    },
    
    items: [{
        xtype: 'fssTreeList',
        reference: 'leagueList'
    }, {
        xtype: 'fssDetails'
    }]
});