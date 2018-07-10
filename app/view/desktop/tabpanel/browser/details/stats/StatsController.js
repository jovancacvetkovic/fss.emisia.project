/**
 * Browser details statistics controller
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.stats.StatsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssDetailsStatsController',

    requires: [
        'Ext.field.Display'
    ],

    loadDetails: function (details) {
        var items = [];
        var view = this.getView();
        var generalInfo = this.getGeneralInfo(details);
        var item;
        var itemConfig;
        for (var label in generalInfo) {
            if (generalInfo.hasOwnProperty(label)) {
                item = generalInfo[label];
                if (typeof item === 'object') {
                    itemConfig = this.getItemsConfig(item);
                }
                else {
                    itemConfig = this.getItemConfig(label, item);
                }
                items.push(itemConfig);
            }
        }
        view.setItems(items);

        if (view.header) {

            this.getView().applyBind({
                title: '{locale#' + view.refName.replace('.', '') + '}'
            });
        }

        this.updateLocale();
    },

    getGeneralInfo: function (details) {
        var view = this.getView();
        var reference = view.refName;
        if (reference.indexOf('.')) {
            var refs = reference.split('.');
            var index = 0;
            while (index < refs.length && details) {
                details = details[refs[index]];
                index++;
            }
        }

        return details;
    },

    getItemConfig: function (label, value) {
        var isMobile = FSS.getApplication().getCurrentProfile().isMobile;
        return {
            xtype: 'displayfield',
            flex: 1,
            labelAlign: !isMobile ? 'top' : 'left',
            bind: {
                label: '{locale#' + label + '}'
            },
            value: value
        };
    },

    getItemsConfig: function (item) {
        var itemConfigs = [];
        for (var itemLabel in item) {
            if (item.hasOwnProperty(itemLabel)) {
                var config = this.getItemConfig(itemLabel, item[itemLabel]);
                itemConfigs.push(config);
            }
        }

        return {
            xtype: 'container',
            flex: 1,
            cls: 'fssDetailsStatsContainer',
            items: itemConfigs
        };
    }
});