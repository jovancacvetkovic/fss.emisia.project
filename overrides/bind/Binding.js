Ext.define('FSS.overrides.bind.Binding', {
    override: 'Ext.app.bind.Binding',

    constructor: function (stub, callback, scope, options) {
        var me = this;

        me.callParent([stub, callback, scope, options]);

        // mark binding as locale binding
        var isLocale = options && options.isLocale;
        var scheduler = me.stub.getScheduler();
        if (scheduler && isLocale) {
            // setting isLocale on scheduler
            // because scheduler is the one who knows what the bind is for
            scheduler.isLocale = isLocale;
            // We need to announce the current value, so if the stub is available
            // will generate its own announcement to all bindings) then we need to schedule
            if (!stub.scheduled) {
                me.schedule();
            }
        }
    }
});