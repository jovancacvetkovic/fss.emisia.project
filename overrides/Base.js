Ext.define('FSS.overrides.Base', {
    override: 'Ext.Base',

    requires: [
        'FSS.util.Util'
    ],

    config: {
        locale: {}
    },

    setViewportMasked: function (mask, text) {
        FSS.Util.setViewportMasked(mask, text);
    }
});