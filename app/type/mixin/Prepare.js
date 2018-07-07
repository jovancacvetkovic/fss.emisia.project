/**
 * Prepare data mixin type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.mixin.Prepare', {
    extend: 'FSS.type.Abstract',

    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },

    /**
     * @property {String} ROOT
     * League root
     */
    ROOT: undefined,

    /**
     * @property {String} NAME
     * League name
     */
    NAME: undefined,

    /**
     * @property {String} GROUP
     * League group
     */
    GROUP: undefined
});