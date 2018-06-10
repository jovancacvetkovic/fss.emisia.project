/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicController',
    
    control: {
        '[reference=fssDetails]': {
            'painted': 'setScrollerLayout'
        }
    },
    
    /**
     * Called when the view is created
     */
    init: function(){
        this.getView().applyBind({
            title: '{appLocale.title}'
        });
    },
    
    /**
     * Set scroller layout
     */
    setScrollerLayout: function(){
        var fssDetails = this.lookup('fssDetails');
        
        //noinspection JSUnresolvedFunction
        this.lookup('scroller').getController().register({
            scrollEl: Ext.getBody(),
            syncList: [fssDetails]
        });
    }
});