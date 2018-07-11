// noinspection JSCheckFunctionSignatures
/**
 * List grouper header component controller
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.header.HeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssListHeaderController',

    /**
     * Called when the view is created
     */
    init: function () {
        this.getViewModel().bind('{locale#header}', this.onLocaleChange, this, {
            deep: true
        });
    },

    onLocaleChange: function (locales, prevLocale, binding) {
        if (this.getView().getGroup()) {
            var groupKey = this.getView().getGroupHeaderTplData().name;
            if (locales && locales[groupKey]) {
                this.getView().setHtml(locales[groupKey]);
            }
        }
    }
});