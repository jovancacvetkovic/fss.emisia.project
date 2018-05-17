/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.details.Details', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.basic.details.DetailsController',
        'FSS.view.desktop.basic.details.DetailsModel'
    ],

    xtype: 'fssDetails',

    viewModel: {
        type: 'details'
    },

    controller: 'details',
    
    items: []
});