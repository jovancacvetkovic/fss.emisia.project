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
        var locale = this.getSuperLocale(this, locales, {});
        if (Ext.Object.getSize(locale)) {
            this.setLocale(locale);
        }
    },

    getSuperLocale: function (cmp, locales, locale) {
        locale = locale ? locale : {};
        locales = locales ? locales : {};

        var localeKey = cmp.$className;
        var superLocaleKey = cmp.superclass ? cmp.superclass.$className : '';
        var superLocale = locales[superLocaleKey] ? locales[superLocaleKey] : {};

        Ext.applyIf(locale, locales[localeKey] ? locales[localeKey] : {});
        Ext.applyIf(locale, superLocale);

        if (cmp.superclass) { // If there is superclass try and get its locales
            locale = this.getSuperLocale(cmp.superclass, locales, locale);
        }

        return locale;
    },

    translate: function (arg) {
        var locale = this.getLocale();
        var isEmptylocale = !locale || !Ext.Object.getSize(locale);
        if (isEmptylocale && this.getViewModel) {
            locale = this.getViewModel().getLocale();
        }

        if (locale && locale[arg]) {
            return locale[arg];
        }

        return arg;
    },

    updateLocale: function () {
        var locale = this.getLocale();
        if (locale) {
            this.setLocale(locale);
        }

        if (this.getViewModel) {
            var model = this.getViewModel();
            if (model) {
                locale = model.getLocale();
                model.setLocale(locale);
            }
        }
    }
});