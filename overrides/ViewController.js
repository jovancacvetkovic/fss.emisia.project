/**
 * This overrides ViewController of a component.
 */
Ext.define('FSS.overrides.ViewController', {
    override: 'Ext.app.ViewController',

    mixins: ['FSS.mixin.Localization'],

    setViewportMasked: function (mask, text) {
        var view = this.getView();
        if (view) {
            view.setViewportMasked(mask, text);
        }
    }
});