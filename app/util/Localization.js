/**
 * FSS localization util
 * FSS localization store wrapper
 *
 * NOTE: testing other languages then EN, you should set FSS.isDev to `false` in index.html file
 */
Ext.define('FSS.util.Localization', {

    requires: [
        'FSS.store.Localization'
    ],

    singleton: true,

    constructor: function () {
        this.callParent(arguments);
        FSS.LocaleStore = Ext.create('FSS.store.Localization', {});
    },

    /**
     * Loads new locales
     * @param {String} url Locale file url
     */
    loadLocales: function (url) {
        if (url) {
            FSS.LocaleStore.proxy.setUrl(url);
            FSS.LocaleStore.load();
        }
    },

    /**
     * Returns locale url
     * @returns {String}
     */
    getLocaleUrl: function () {
        return FSS.LocaleStore.getLocaleUrl();
    }
}, function () {
    FSS.Locale = FSS.util.Localization;
});