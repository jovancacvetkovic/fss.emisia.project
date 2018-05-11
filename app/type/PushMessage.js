/**
 * Push message type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.PushMessage', {
    extend: 'FSS.type.Abstract',
    
    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },
    
    /**
     * @property {String} title
     * Push message title
     */
    title: undefined,
    
    /**
     * @property {String} notification
     *
     */
    notification: undefined
});