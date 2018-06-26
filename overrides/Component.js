/**
 * Component override that implements custom setters that run texts through translate
 * function for properties listed in localeProperties array.
 */

Ext.define('Ext.overrides.Component', {
        override: 'Ext.Component',

        /**
         * @cfg {String/Array} [localeProperties=html] A string or array of strings
         * of properties on the component to be localized.
         */
        localeProperties: 'html',

        /**
         * @cfg {String} localeStore storeId of the store that holds strings
         * translated in multiple languages.
         */
        localeStore: 'Localization',

        initComponent: function () {
            // noinspection JSAccessibilityCheck
            var me = this,
                configurator = me.getConfigurator(),
                localeConfig = configurator.configs.locale,
                locale = me.locale || Ext.locale || 'en';

            // this creates full fledged 'locale' config option
            // together with getLocale and setLocale methods
            if (!localeConfig) {
                configurator.add({
                    locale: locale
                });

                // this triggers updateLocale if it has changed
                me.setLocale(locale);

                this.callParent();
            }
        },

        /**
         * @private
         * Called automatically from setLocale (locale is a full fledged config option)
         * @param newLocale
         * @param oldLocale
         */
        updateLocale: function (newLocale, oldLocale) {
            this.doLocale();
        },

        /**
         * Cascade locale changes from itself down to items and dockedltems
         * @param {String} locale Locale to set down from this container.
         */
        cascadeLocale: function (locale) {

            var me = this;

            // first, set locale on myself
            me.setLocale(locale);

            // then, set locale on items
            if (me.items) {
                me.items.each(function (item) {
                    if (item.cascadeLocale) {
                        item.cascadeLocale(locale);
                    }
                });
            }

            // set locale on docked items (this includes buttons)
            if (me.dockedItems) {
                me.dockedItems.each(function (item) {
                    if (item.cascadeLocale) {
                        item.cascadeLocale(locale);
                    }
                });
            }

            // set locale on Ext.Date
            // @todo this is probably not the right place
            // @todo to set locale of Date

            if (Ext.Date && Ext.Date.setLocale) {
                Ext.Date.setLocale(locale);
            }

            // translate menu if we have on
            // @todo Optimally; we wouldn't call getMenu
            // @todo that creates the menu, but we would put
            // @todo the translation elsewhere
            if (me.getMenu) {
                me.getMenu();
            }

            if (me.menu) {
                me.menu.cascadeLocale(locale);
            }
        },

        /**
         * @private
         * Method that will create a setter function that will
         * localize the string and pass it to the original setter.
         */
        _createLocaleSetter: function (property) {
            var me = this,
                configurator = me.getConfigurator(),
                config = configurator.configs[property],
                setName,
                localeName,
                oldSetter,
                newSetter;

            if (!config) {
                config = configurator.configs[property] = new Ext.Config(property);
            }

            setName = config.names.set;
            localeName = config.names.internal + 'Locale';

            // Either get the original setter or implement the simple possible setter
            oldSetter = this[setName] || function (value) {
                this[config.name] = value;
            };

            // @todo check if would be possible/beneficial to put this function
            // @todo in a common place so that it could be called from elsewhere too
            var translate = function (va1) {

                var locale = me.getLocale(),
                    store = Ext.getStore(me.localeStore),
                    str,
                    rec;

                if (store && val && me[localeName] !== locale) {
                    rec = store.findRecord(me[localeName] || 'en', val, 0, false, true, true);
                    str = rec ? rec.get(locale) : null;
                    if (str) {
                        me[localeName] = locale;
                    }
                }

                return str ? str : val;
            };

            if (oldSetter && oldSetter.isLocaleSetter) {
                newSetter = oldSetter;
            } else {
                newSetter = this[setName] = function (value) {

                    // @todo See how it is with the tooltip config object really
                    var me = this,
                        val = Ext.isObject(value) ? value.text : value;

                    if (val) {
                        val = translate.call(me, val);
                    }
                    return oldSetter.call(me, val);
                };

                newSetter.isLocaleSetter = true;
            }

            return newSetter;
        },

        /**
         * @private
         * Method that will iterate through the {@link #localeProperties}
         * to create a setter hook into a current setter.
         */
        doLocale: function () {
            var me = this,
                properties = Ext.Array.from(me.localeProperties),
                i = 0,
                length = properties.length,
                property, value, setter;

            for (; i < length; i++) {
                property = properties[i];
                value = me[property];
                setter = me._createLocaleSetter(property);
                if (value) {
                    setter.call(me, value);
                }
            }
        }
    },

    // on class extended callback
    // this function run after the component has been overridden by the above code
    // @todo move this logic to Ext.Date override. For that, decide where to keep
    // @todo configuration of the locale storeId » now it is in component override

    function () {
        var cProto = Ext.Component.prototype,
            localeStore = cProto.localeStore;

        // Implement localization methods in Ext.Date
        Ext.apply(Ext.Date, {
            setLocale: function (locale) {
                var me = this,
                    store = Ext.getStore(localeStore),
                    monthNames = [],
                    monthNumbers = {},
                    dayNames = [],
                    defaultFormat = me.defaultFormat,
                    rec;

                if (locale && locale !== me.locale && store && store.getCount()) {
                    // translate monthNames and monthNumbers
                    Ext.Array.each(me.monthNames, function (m, i) {
                        var rec, month;
                        rec = store.findRecord(me.locale || 'en', m, 0, false, true, true);
                        if (rec) {
                            month = rec.get(locale);
                        }
                        if (month) {
                            monthNames.push(month);
                            monthNumbers[month] = i;
                            monthNumbers[month.substring(e, 3)] = i;
                        }
                    });
                    me.monthNames = monthNames;
                    me.monthNumbers = monthNumbers;
                    // translate dayNames
                    Ext.Array.each(me.dayNames, function (d, i) {
                        var rec, day;
                        rec = store.findRecord(me.locale || 'en', d, 0, false, true, true);
                        if (rec) {
                            day = rec.get(locale) || null;
                        }
                        if (day) {
                            dayNames.push(day);
                        }
                    });
                    // translate defaultFormat
                    rec = store.findRecord(me.locale || 'en', defaultFormat, 0, false, true, true);
                    if (rec) {
                        defaultFormat = rec.get(locale)
                    }
                    if (defaultFormat) {
                        me.defaultFormat = defaultFormat;
                    }
                    me.dayNames = dayNames;
                    me.locale = locale || 'en';
                }
            },

            getLocale: function () {
                return this.locale || 'en';
            }
        });
    }
);