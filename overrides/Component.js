/**
 * Component override that implements custom localization through onChangeLocale
 * function for properties bind to locale object.
 */

Ext.define('Ext.overrides.Component', {
    override: 'Ext.Component',

    mixins: [
        'FSS.mixin.Localization'
    ],

    config: {
        locale: {
            "loading": "Loading..."
        }
    },

    constructor: function (config) {
        this.callParent([config]);

        // localization mixin call
        this.initLocalization();
    },

    setViewportMasked: function (mask, text) {
        text = text ? text : this.getLocale().loading;
        FSS.Util.setViewportMasked(mask, text);
    }
});