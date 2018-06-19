/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.header.Header', {
    extend: 'Ext.tab.Bar',
    
    requires: [
        'FSS.view.desktop.tabpanel.header.HeaderController',
        'FSS.view.desktop.tabpanel.header.HeaderModel',
        'FSS.view.desktop.tabpanel.header.actions.Actions'
    ],
    
    xtype: 'fssHeader',
    
    viewModel: {
        type: 'fssHeaderModel'
    },
    
    cls: 'fssHeader',
    
    controller: 'fssHeaderController',
    
    template: [{
        xtype: 'container',
        cls: Ext.baseCSSPrefix + 'body-el fssLogo',
        reference: 'fssLogo',
        uiCls: 'body-el'
    }, {
        cls: Ext.baseCSSPrefix + 'body-el',
        reference: 'bodyElement',
        uiCls: 'body-el'
    }, {
        xtype: 'fssHeaderActions',
        reference: 'fssHeaderActions',
        uiCls: 'body-el'
    }],
    
    initElement: function(){
        var me = this;
        me.callParent();
        
        if (me.fssHeaderActions) {
            var headerActionsConfig = Ext.Array.findBy(me.getTemplate(), me.getActionsConfig, me);
            if (headerActionsConfig){
                // Render to actions holder el
                headerActionsConfig.renderTo = me.fssHeaderActions;
                Ext.factory(headerActionsConfig); // Create actions bar
            }
            
            me.fssHeaderActions.addCls('fssHeaderActions');
        }
    },
    
    getActionsConfig: function(item){
        return item.xtype == 'fssHeaderActions'
    }
});