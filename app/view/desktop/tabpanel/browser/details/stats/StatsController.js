/**
 * Created by emisia on 5/22/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.details.stats.StatsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssDetailsStatsController',
    
    requires: [
        'Ext.field.Display'
    ],
    
    loadDetails: function(details){
        let items = [];
        let view = this.getView();
        let generalInfo = this.getGeneralInfo(details);
        let item;
        let itemConfig;
        for (let label in generalInfo) {
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
            view.setTitle(view.refName);
        }
    },
    
    getGeneralInfo: function(details){
        let view = this.getView();
        let reference = view.refName;
        if (reference.indexOf('.')){
            let refs = reference.split('.');
            let index = 0;
            while (index < refs.length && details){
                details = details[refs[index]];
                index++;
            }
        }
        
        return details;
    },
    
    getItemConfig: function(label, value){
        return {
            xtype: 'displayfield',
            flex: 1,
            labelAlign: 'top',
            label: label,
            value: value
        };
    },
    
    getItemsConfig: function(item){
        let itemConfigs = [];
        for (let itemLabel in item) {
            if (item.hasOwnProperty(itemLabel)) {
                let config = this.getItemConfig(itemLabel, item[itemLabel]);
                itemConfigs.push(config);
            }
        }
        
        return {
            xtype: 'container',
            flex: 1,
            items: itemConfigs
        };
    }
});