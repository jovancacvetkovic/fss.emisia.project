/**
 * This override encapsulates the ViewModel of a component.
 * This is achieved by giving unique names to the properties of the ViewModel.
 */
Ext.define('FSS.overrides.ViewModel', {
    override: 'Ext.app.ViewModel',

    mixins: [
        'FSS.mixin.Localization'
    ],

    /**
     * @private
     * @property {RegExp} localeRe
     * Locale matcher regex. All locale bind selectors should start with `locale#` followed by some-locale-key
     * EG locale#title, locale#fieldLabel, ... etc...
     */
    localeRe: /^{locale#/,

    constructor: function (config) {
        this.callParent([config]);

        // localization mixin call
        this.initLocalization();
    },

    /**
     * @inheritDoc
     *
     * Overridden to add locale selector matcher and add binding to a locale specific key
     * It will match any locale selector starting with `locale#`
     */
    bind: function (descriptor, callback, scope, options) {
        var me = this,
            binding;

        if (!options && descriptor.bindTo !== undefined && !Ext.isString(descriptor)) {
            options = descriptor;
            descriptor = options.bindTo;
        }

        if (me.localeRe.test(descriptor)) {
            descriptor = descriptor.substring(8, descriptor.length - 1);

            // mark bind option as locale bind, this is later used to get locale object instead of data
            options = Ext.apply(options || {}, {
                isLocale: true
            });
            binding = me.bindExpression(descriptor, callback, scope, options);
        }
        else {
            binding = this.callParent([descriptor, callback, scope, options]);
        }

        return binding;
    },

    privates: {
        /**
         * Apply locale objects from current locales with parent locales
         * @param {Object} newLocales
         * @param {Object} locale
         */
        applyLocale: function (newLocales, locale) {
            var me = this,
                linkLocale, parent;

            // Force any session to be invoked so we can access it
            me.getSession();
            if (!locale) {
                parent = me.getParent();

                /**
                 * @property {Object} linkLocale
                 * This object is used to hold the locales of a linked value. This is done
                 * so that the locale object hasOwnProperty equates to whether or not this
                 * property is owned by this instance or inherited.
                 * @private
                 * @readonly
                 */
                me.linkLocale = linkLocale = parent ? Ext.Object.chain(parent.getLocale()) : {};

                /**
                 * @property {Object} locale
                 * This object holds all of the locales of this `ViewModel`. It is
                 * prototype chained to the `linkLocale` which is, in turn, prototype chained
                 * to (if present) the `locale` object of the parent `ViewModel`.
                 * @private
                 * @readonly
                 */
                me.locale = me._locale = Ext.Object.chain(linkLocale);
            }

            if (newLocales && newLocales.constructor === Object) {
                // If there are locales then set locale value/object for that instance
                me.getRoot().setLocale(newLocales, true);
            }
        }
    },

    /**
     * Returns locales
     * @returns {Object}
     */
    getLocale: function () {
        return this.locale;
    }
});