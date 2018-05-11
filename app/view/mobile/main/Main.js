/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.mobile.main.Main', {
    extend: 'FSS.view.desktop.main.Main',

    requires: [
        'FSS.view.mobile.main.MainModel',
		'FSS.view.mobile.main.MainController'
    ],

    xtype: 'fssMobileMain',

    viewModel: {
        type: 'fssMobileMainModel'
    },
    
    cls: 'fssMobileMain',
    
    controller: 'fssMobileMainController',
    
    items: [{
        xtype: 'fssBrowser',
        reference: 'fssBrowser',
        title: 'Pretrazivac'
    }, {
        xtype: 'fssMessages',
        reference: 'fssMessages',
        title: 'Poruke'
    }, {
        xtype: 'fssSystematization',
        reference: 'fssSystematization',
        title: 'Sistematizacija'
    }]
});