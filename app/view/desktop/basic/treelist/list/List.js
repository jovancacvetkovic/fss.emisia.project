/**
 * Created by emisia on 5/17/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.list.List', {
    extend: 'Ext.dataview.List',

    requires: [
        'FSS.view.desktop.basic.treelist.list.ListModel',
		'FSS.view.desktop.basic.treelist.list.ListController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'list',
    */

    viewModel: {
        type: 'list'
    },

    controller: 'list',

    items: [
        /* include child components here */
    ]
});