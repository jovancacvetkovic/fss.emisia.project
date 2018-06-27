/**
 * Component override that implements custom localization through onChangeLocale
 * function for properties bind to locale object.
 */

Ext.define('Ext.overrides.Component', {
    override: 'Ext.Component',

    mixins: [
        'FSS.mixin.Localization'
    ],

    initComponent: function () {
        this.callParent();

        // localization mixin call
        this.initLocalization();
    }
});