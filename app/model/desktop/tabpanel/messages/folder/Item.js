/**
 * FSS.model.desktop.tabpanel.messages.folder.Item
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.model.desktop.tabpanel.messages.folder.Item', {
    extend: 'FSS.model.Base',
    
    fields: [{
        name: 'name'
    }, {
        name: 'folder',
        calculate: function(values){
            var key = values['name'];
            var locale = this.getLocale();
            return locale[key] ? locale[key] : key;
        }
    }],
    
    locale: {
        "INBOX": "Inbox",
        "SENT": "Sent",
        "DRAFT": "Draft",
        "DELETED": "Deleted"
    }
});