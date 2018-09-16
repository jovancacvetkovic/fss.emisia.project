/**
 * FSS.view.desktop.tabpanel.messages.details.Details
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.tabpanel.messages.details.Details', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.tabpanel.messages.details.DetailsModel',
		'FSS.view.desktop.tabpanel.messages.details.DetailsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'details',
    */

    viewModel: {
        type: 'details'
    },

    controller: 'details',

    items: [
        /* include child components here */
    ]
});