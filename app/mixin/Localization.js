/**
 * FSS Localization Mixin
 */
Ext.define('FSS.mixin.Localization', {

    config: {
        /**
         * @private
         * @protected
         * @cfg {Object}
         * ViewModel locale object.
         * This is where all locale strings should be set.
         */
        locale: true
    },

    /**
     * Init localization after locale file is loaded
     */
    initLocalization: function () {
        FSS.LocaleStore.on('load', this.onChangeLocale, this);
    },

    /**
     * After locale file is loaded trigger setLocale
     * to set/update/apply all locale bind values
     * @param {FSS.store.Localization} store
     * @param {Ext.data.Model[]} records
     */
    onChangeLocale: function (store, records) {
        var locales = records && records[0].getData();

        // noinspection JSAccessibilityCheck
        var localeKey = this.$className;
        var locale = locales[localeKey];
        if (locale) {
            this.setLocale(locale);
        }
    }
});