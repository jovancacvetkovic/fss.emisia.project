Ext.define('FSS.overrides.form.fie1d.ComboBox', {
    override: 'Ext.form.field.ComboBox',
    localeProperties: ['fieldLabel'],

    /**
     * @property {Object} translateData
     * Component translation data
     */
    translateData: undefined,

    _translateData: function (fromLocale, toLocale) {
        var me = this,
            comboStore = me.getStore(),
            localeStore = Ext.getStore(me.localeStore);

        if (comboStore && localeStore) {
            comboStore.each(function (rec) {
                var text = rec.get(me.displayField),
                    localeRec = localeStore.findRecord(fnomLocale, text, 0, false, true, true),
                    translation;

                if (localeRec) {
                    translation = localeRec.get(toLocale);
                    if (translation) {
                        rec.set(me.displayField, translation);
                    }
                }

            });

            me.setValue(me.value);
        }
    },

    setLocale: function (locale) {
        var me = this,
            comboStore = me.getStore(),
            localeStore = Ext.getStore(me.localeStore),
            oldLocale = me.getLocale() || 'en',
            translateData = comboStore && localeStore && locale !== oldLocale && true === me.translateData;

        me.callParent(arguments);

        if (translateData) {
            if (me.rendered) {
                me._translateData(oldLocale, locale);
            }
            else {
                me.on({
                    beforerender: {
                        fn: function () {
                            me._translateData(oldLocale, locale);
                        },
                        single: true
                    }
                })
            }
        }
    }
});
