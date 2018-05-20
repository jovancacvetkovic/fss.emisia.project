/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.TreeListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssTreeListController',
    
    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },
    
    control: {
        '[reference=mainList]': {
            select: 'onMainListSelectHandler'
        },
        '[reference=subList]': {
            select: 'onSubListSelectHandler'
        }
    },
    
    rootUrlTpl: 'LEAGUE/{0}',
    
    subUrlTpl: 'LEAGUE/{0}/SUB_LEAGUE/{1}',
    
    loadTreeData: function(data, nodeName){
        nodeName = nodeName ? nodeName : 'mainList';
        
        let store = this.lookup(nodeName).getStore(nodeName);
        store.loadRawData(data);
    },
    
    onMainListSelectHandler: function(list, listItem){
        var itemData = listItem.getData();
        var subId = itemData.id;
    
        this.collapseDetailsList();
        this.collapseSubList();
        
        
        let dbQueryUrl = Ext.String.format(this.rootUrlTpl, subId);
        var leagues = FSS.firebase.database().ref(dbQueryUrl);
        leagues.once('value').then(this.loadSubList.bind(this));
    },
    
    onSubListSelectHandler: function(list, listItem){
        this.collapseDetailsList();
        
        var itemData = listItem.getData();
        var subId = itemData.id;
        var rootId = this.lookup('subList').getRootId();
    
        let dbQueryUrl = Ext.String.format(this.subUrlTpl, rootId, subId);
        var leagues = FSS.firebase.database().ref(dbQueryUrl);
        leagues.once('value').then(this.loadDetailsList.bind(this));
    },
    
    collapseDetailsList: function(){
        this.lookup('detailsList').getSelectable().deselectAll();
        this.lookup('detailsListPanel').collapse();
    },
    
    collapseSubList: function(){
        this.lookup('subList').getSelectable().deselectAll();
        this.lookup('subListPanel').collapse();
    },
    
    loadDetailsList: function(snapshot){
        //noinspection JSUnresolvedFunction
        var league = snapshot.val();
        let subLeagues = league['SUB_LEAGUE'];
        if (subLeagues) {
            subLeagues = this.mixins.prepare.prepareLeaguesData(subLeagues);
            if (subLeagues && subLeagues.length) {
                this.lookup('detailsListPanel').expand();
                this.lookup('detailsList').setRootId(snapshot.key);
                this.loadTreeData(subLeagues, 'detailsList');
            }
        }
    },
    
    loadSubList: function(snapshot){
        //noinspection JSUnresolvedFunction
        var league = snapshot.val();
        let subLeagues = league['SUB_LEAGUE'];
        if (subLeagues) {
            subLeagues = this.mixins.prepare.prepareLeaguesData(subLeagues);
            if (subLeagues && subLeagues.length) {
                this.lookup('subListPanel').expand();
                this.lookup('subList').setRootId(snapshot.key);
                this.loadTreeData(subLeagues, 'subList');
            }
        }
    }
});