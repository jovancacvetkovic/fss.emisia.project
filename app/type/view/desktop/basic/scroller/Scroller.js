/**
 * Scroller cfg type
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.view.desktop.basic.scroller.Scroller', {
    extend: 'FSS.type.Abstract',
    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },
    
    /**
     * @property {Ext.container.Container} scrollEl
     * Scroller height element, scroll height will be inherited from `scrollEl`
     */
    scrollEl: undefined,
    
    /**
     * @property {Ext.container.Container[]} syncList
     * List of all containers that are syncing their scrolls with scroller
     */
    syncList: [],
    
    /**
     * @property {Number} scrollMargin
     * Scroll margin will be added to total scroll height.
     * It is used if scroll container height is not same as synced container height.
     * Example: if container has header that is not included into scroll then header height will be used to update scroll height accordingly
     */
    scrollMargin: 0
});