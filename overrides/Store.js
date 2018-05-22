/**
 * Created by emisia on 5/22/18.
 */
Ext.define('FSS.overrides.Store', {
    override: 'Ext.data.Store',
    
    /**
     * @override
     */
    loadRawData: function(records, options){
        let me = this;
        this.callParent(arguments);
        
        if (me.hasListeners.load) {
            // Fire store load event after load is finished
            me.fireEvent('load', me);
        }
    }
});