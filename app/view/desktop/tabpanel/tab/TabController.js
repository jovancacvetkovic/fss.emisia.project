// noinspection JSCheckFunctionSignatures
/**
 * FSS desktop view tab controller
 */
Ext.define('FSS.view.desktop.tabpanel.tab.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssTabController',
    
    control: {
        'component': {
            'painted': 'setScrollerLayout'
        }
    },

    init: function(){
        this.getView().applyBind({
            title: '{locale#title}'
        });
    
    
        this.getViewModel().bind('{activeRoute}', this.onActiveRoute, this, {
            deep: true
        });
    },
    
    onActiveRoute: Ext.emptyFn,
    
    /**
     * Set scroller layout
     */
    setScrollerLayout: Ext.emptyFn
});