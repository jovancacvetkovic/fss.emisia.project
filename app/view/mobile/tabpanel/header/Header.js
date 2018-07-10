/**
 * Mobile main header view
 */
Ext.define('FSS.view.mobile.tabpanel.header.Header', {
    extend: 'FSS.view.desktop.tabpanel.header.Header',

    xtype: 'fssMobileHeader',

    requires: [
        'FSS.view.mobile.tabpanel.header.actions.Actions'
    ],

    cls: 'fssMobileHeader',

    template: [{
        xtype: 'container',
        cls: Ext.baseCSSPrefix + 'body-el fssLogo',
        reference: 'fssLogo',
        uiCls: 'body-el'
    }, {
        xtype: 'fssMobileHeaderActions',
        reference: 'fssHeaderActions',
        uiCls: 'body-el'
    }, {
        cls: Ext.baseCSSPrefix + 'body-el',
        reference: 'bodyElement',
        uiCls: 'body-el',
        hidden: true
    }],

    getActionsConfig: function (item) {
        return item.xtype === 'fssMobileHeaderActions';
    }
});