/**
 * FSS.view.desktop.tabpanel.messages.details.Details
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.tabpanel.messages.details.Details', {
    extend: 'Ext.Container',
    xtype: 'fssMessagesDetails',

    requires: [
        'FSS.view.desktop.tabpanel.messages.details.DetailsModel',
		'FSS.view.desktop.tabpanel.messages.details.DetailsController'
    ],

    viewModel: {
        type: 'fssMessagesDetailsModel'
    },

    controller: 'fssMessagesDetailsController',

    items: [
        /* include child components here */
    ]
});