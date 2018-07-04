/**
 * Locale stub
 * Used for View Model stub for localization
 */
Ext.define('FSS.bind.LocaleStub', {
    extend: 'Ext.app.bind.Stub',

    set: function (value, preventClimb) {
        this.scheduler.isLocale = true;
        this.callParent(arguments);
    }
});