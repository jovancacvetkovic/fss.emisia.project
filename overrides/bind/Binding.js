Ext.define('FSS.overrides.bind.Binding', {
    override: 'Ext.app.bind.Binding',

    constructor: function (stub, callback, scope, options) {
        var me = this;

        me.callParent([stub, callback, scope, options]);

        // mark binding as locale binding
        var isLocale = options && options.isLocale;
        var scheduler = me.stub.getScheduler();
        if (scheduler) {
            // setting isLocale on scheduler
            // because scheduler is the one who knows what the bind is for
            scheduler.isLocale = isLocale;
        }
    }
});