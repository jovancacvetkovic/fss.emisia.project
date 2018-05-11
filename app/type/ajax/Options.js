/**
 * Ajax request options type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.ajax.Options', {
    extend: 'FSS.type.Abstract',
    
    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    }
});