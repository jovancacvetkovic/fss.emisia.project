/**
 * FSS localization store
 * This store loads locale file and creates single record containing all locales within
 * Any component using this store can get data/locales from store
 * and update its locale property and therefor update bind values
 */
Ext.define('FSS.store.Localization', {
    extend: 'Ext.data.Store',

    localeUrlTemplate: 'resources/locale/{0}.json',

    constructor: function () {
        this.callParent(arguments);

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

    getLocale: function () {
        var locale = Ext.util.Cookies.get('locale') ? Ext.util.Cookies.get('locale') : (
            Ext.locale ? Ext.locale : (
                FSS.isDev ? '' : 'en'
            )
        );

        return locale;
    },

    getLocaleUrl: function () {
        var locale = this.getLocale();
        return Ext.String.format(this.localeUrlTemplate, locale);
    }
});
