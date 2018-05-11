/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.header.Header', {
    extend: 'Ext.tab.Bar',
    
    requires: [
        'FSS.view.desktop.header.HeaderController',
        'FSS.view.desktop.header.HeaderModel',
        'FSS.view.desktop.header.actions.Actions'
    ],
    
    xtype: 'fssHeader',
    
    viewModel: {
        type: 'header'
    },
    
    cls: 'fssHeader',
    
    controller: 'header',
    
    template: [{
        xtype: 'container',
        cls: 'x-body-el fssLogo',
        reference: 'fssLogo',
        uiCls: 'body-el'
    }, {
        cls: 'x-body-el',
        reference: 'bodyElement',
        uiCls: 'body-el'
    }, {
        xtype: 'fssHeaderActions',
        cls: 'fssHeaderActions',
        reference: 'fssHeaderActions',
        uiCls: 'body-el'
    }, {
        cls: 'x-strip-el',
        reference: 'stripElement'
    }]
});