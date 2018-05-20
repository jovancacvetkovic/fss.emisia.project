/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicController',
    
    /**
     * Called when the view is created
     */
    init: function(){
        this.getView().applyBind({
            title: '{appLocale.title}'
        });
    }
});