Ext.define('FSS.store.Localization', {
    extend: 'Ext.data.Store',

    alias: 'store.localization',

    autoLoad: true,

    fields: [
        'en',
        'sr'
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/locale/en.json',
        reader: {
            type: 'json',
            rootProperty: 'translations'
        }
    }
});
