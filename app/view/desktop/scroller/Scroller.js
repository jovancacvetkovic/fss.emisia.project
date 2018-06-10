/**
 * View scroller component. Used to control multiple views and scrolling
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.scroller.Scroller', {
    extend: 'Ext.container.Container',
    xtype: 'fssScroller',
    
    requires: [
        'Ext.Component',
        'FSS.view.desktop.scroller.ScrollerController'
    ],
    
    cls: 'fss-scroller',
    
    controller: 'fssScrollerController',
    
    items: [{
        xtype: 'component',
        reference: 'scroller'
    }],
    
    /**
     * @property {String} scrollable
     * This property requires strings `x` or `y` to define which scroll direction to use.
     * Defaults to `y`
     */
    scrollable: 'y',
    
    /**
     * @property {Ext.Component} scroller
     * Scroller element component
     */
    scroller: undefined,
    
    initialize: function(){
        if (Ext.getBody()) {
            Ext.apply(this, {
                // This should be rendered into body
                renderTo: Ext.getBody()
            });
        }
        //noinspection JSAccessibilityCheck
        this.callParent(arguments);
    }
});