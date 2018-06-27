/**
 * Created by emisia on 5/8/18.
 */
Ext.define('FSS.view.desktop.tabpanel.header.actions.item.ItemController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssHeaderActionItemController',

    localeUrlTpl: 'resources/locale/{0}.json',

    /**
     * Trigger after locale is changed
     * Update store via loading selected locale file
     * @param {FSS.view.desktop.tabpanel.header.actions.item.Item} item
     */
    onLocaleTriggered: function (item) {
        var locale = item.getItemId();
        var url = Ext.String.format(this.localeUrlTpl, locale);
        FSS.Locale.loadLocales(url);
        Ext.util.Cookies.set('locale', locale);
    }
});