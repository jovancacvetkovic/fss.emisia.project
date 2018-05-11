/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.tablet.main.Main', {
    extend: 'FSS.view.desktop.main.Main',

    requires: [
        'FSS.view.tablet.main.MainModel',
		'FSS.view.tablet.main.MainController'
    ],

    xtype: 'fssTabletMain',

    viewModel: {
        type: 'fssTabletMainModel'
    },

    controller: 'fssTabletMainController'
});