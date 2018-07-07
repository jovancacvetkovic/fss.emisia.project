/**
 * Prepared data mixin type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.mixin.Prepared', {
    extend: 'FSS.type.Abstract',

    statics: {
        addMembers: function (data) {
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },

    config: {
        /**
         * @property {String} root
         * League root
         */
        root: true,

        /**
         * @property {String} name
         * League name
         */
        name: undefined,

        /**
         * @property {String} group
         * League group
         */
        group: undefined,

        /**
         * @property {String} id
         * League id
         */
        id: undefined
    }
});