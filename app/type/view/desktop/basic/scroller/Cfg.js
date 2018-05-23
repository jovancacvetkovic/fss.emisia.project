/**
 * Scroller cfg type
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.view.desktop.basic.scroller.Cfg', {
    extend: 'FSS.type.Abstract',
    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },
    
    /**
     * @cfg {Number} top
     * Scroll top/vertical position
     */
    top: 0,
    
    /**
     * @cfg {Number} left
     * Scroll left/horizontal position
     */
    left: 0,
    
    /**
     * @cfg {String} behavior
     * Scroll animation effect, defaults to `smooth`
     */
    behavior: ''
});