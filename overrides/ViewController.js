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
    },

    translate: function (arg) {
        var locale = this.getLocale();
        if(!locale || !Ext.Object.getSize(locale)){
            locale = this.getViewModel().getLocale();
        }

        if(locale && locale[arg]){
            return locale[arg];
        }

        return arg;
    }
});