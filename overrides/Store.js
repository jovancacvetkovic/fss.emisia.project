/**
 * Store overrides
 *
 * 1. Add load event
 *
 * @override Ext.data.Store
 */
Ext.define('FSS.overrides.Store', {
    override: 'Ext.data.Store',

    loadRawData: function(records, options){
        let me = this;
        this.callParent(arguments);
        
        if (me.hasListeners.load && !(me.destroying || me.destroyed)) {
            // Fire store load event after load is finished
            me.fireEvent('load', me, records);
        }
    }
});