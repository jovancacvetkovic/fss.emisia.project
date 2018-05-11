/**
 * Ajax response type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.ajax.Response', {
    extend: 'FSS.type.Abstract',
    
    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },
    
    /**
     * @property {String} responseText
     * Ajax response text / json string
     */
    responseText: undefined
});