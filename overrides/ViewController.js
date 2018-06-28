/**
 * This overrides ViewController of a component.
 */
Ext.define('FSS.overrides.ViewController', {
    override: 'Ext.app.ViewController',

    setViewportMasked: function (mask, text) {
        var view = this.getView();
        if (view) {
            view.setViewportMasked(mask, text);
        }
    }
});