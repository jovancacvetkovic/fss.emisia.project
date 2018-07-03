/**
 * Overrides data Model and adds localization into model
 */
Ext.define('FSS.overrides.data.Model', {
    override: 'Ext.data.Model',

    mixins: [
        'FSS.mixin.Localization'
    ],

    constructor: function (data, session) {
        this.callParent([data, session]);

        // localization mixin call
        this.initLocalization();
    }
});