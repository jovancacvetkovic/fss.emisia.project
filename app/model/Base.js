Ext.define('FSS.model.Base', {
    extend: 'Ext.data.Model',
    
    schema: {
        namespace: 'FSS.model'
    },
    
    constructor: function(data, session){
        // Set locale object
        this.setLocale(this.config.locale);
        
        this.callParent(arguments);
    }
});
