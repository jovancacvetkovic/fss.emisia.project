Ext.define('FSS.overrides.Base', {
    override: 'Ext.Base',

    config: {
        locale: {}
    },

    setViewportMasked: function (mask, text) {
        FSS.Util.setViewportMasked(mask, text);
    }
});