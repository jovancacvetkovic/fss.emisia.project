/**
 * FSS localization store
 * This store loads locale file and creates single record containing all locales within
 * Any component using this store can get data/locales from store
 * and update its locale property and therefor update bind values
 */
Ext.define('FSS.store.Localization', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.util.Cookies'
    ],

    localeUrlTemplate: 'resources/locale/{0}.json',

    constructor: function () {
        this.callParent(arguments);

        // create proxy to load locales
        var proxy = new Ext.data.proxy.Ajax({
            autoCreated: true,
            url: this.getLocaleUrl(),
            reader: {
                type: 'json',
                rootProperty: 'translations'
            }
        });
        this.proxy = proxy;
        this.setProxy(proxy);
    },

    /**
     * Returns default or saved locale code
     * Defaults to `en` code
     * @returns {String} locale Locale code
     */
    getLocale: function () {
        var locale = Ext.util.Cookies.get('locale');
        locale = locale ? locale : (
            Ext.locale ? Ext.locale : (
                'en'
            )
        );

        return locale;
    },

    /**
     * Returns generated locale url
     * @returns {String}
     */
    getLocaleUrl: function () {
        var locale = this.getLocale();
        return FSS.isDev ? undefined : Ext.String.format(this.localeUrlTemplate, locale);
    }
});
