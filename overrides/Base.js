Ext.define('FSS.overrides.Base', {
    override: 'Ext.Base',
    
    setMasked: function(mask, text){
        var masked = mask ? {
            xtype: 'loadmask',
            message: text ? text : 'Loading...'
        } : false;
        Ext.Viewport.setMasked(masked);
    }
});