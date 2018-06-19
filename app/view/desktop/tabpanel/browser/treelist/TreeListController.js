/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.TreeListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssTreeListController',

    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },

    requires: [
        'FSS.util.Util'
    ],

    control: {
        '[reference=leagueList]': {
            childtap: 'onMainListSelectRouteHandler',
        },
        '[reference=subLeagueList]': {
            childtap: 'onSubListSelectRouteHandler'
        },
        '[reference=teamList]': {
            childtap: 'onTeamListSelectRouteHandler'
        }
    },

    listen: {
        controller: {
            fssBrowserListController: {
                itemSelect: 'onListItemSelect'
            }
        }
    },

    config: {
        activeLeague: undefined,
        activeList: undefined
    },

    rootUrlTpl: 'LEAGUE/{0}',

    subUrlTpl: 'LEAGUE/{0}/SUB_LEAGUE/{1}',

    loadLeagueList: function (snapshot) {
        var leagues = snapshot.val();
        var leagueList = this.lookup('leagueList');
        leagues = this.mixins.prepare.prepareLeaguesData(leagues);

        var activeLeague = this.getActiveLeague();
        var leagueController = leagueList.getController();
        if (activeLeague) {
            leagueController.setActiveListItem(activeLeague.league);
        }

        leagueController.loadListData(leagues, 'subLeagueList');
    },

    onListItemSelect: function (itemId, nextListReference) {
        let leagueList = this.findList(nextListReference);
        let dbQueryUrl = Ext.String.format(this.rootUrlTpl, itemId);
        leagueList.getController().setActiveListItem(this.getActiveLeague().subLeague);

        if (nextListReference === 'teamList') {
            leagueList.getController().setActiveListItem(this.getActiveLeague().team);
            dbQueryUrl = Ext.String.format(this.subUrlTpl, this.getActiveLeague().league, itemId);
        }

        this.setActiveList(nextListReference);
        var store = leagueList.getStore();
        var range = store.getRange();

        debugger;
        if (!range.length) {
            this.setMasked(true);
            let leagues = FSS.firebase.database().ref(dbQueryUrl);
            var loadFn = Ext.Function.bind(this.loadList, this, [nextListReference], 1);
            leagues.once('value').then(loadFn);
        }
        else {
            if (nextListReference !== 'teamList') {
                leagueList.getController().onLoadHandler(store, range, nextListReference);
            }
            else {
                this.setMasked(false);
            }
        }
    },

    setActiveLeague: function (league) {
        this.setMasked(true);

        //noinspection JSUnusedGlobalSymbols
        this._activeLeague = league;
        if (league) {
            var mainLeague = league.league;
            var isMainLeagueLoaded = false;
            var subLeague = league.subLeague;

            var leagueList = this.findList('leagueList');

            if (mainLeague) {
                isMainLeagueLoaded = leagueList.getStore().getCount();
            }
            debugger;
            this.setActiveList('leagueList');
            if (isMainLeagueLoaded) {
                var itemId = league.league;
                leagueList.getController().setActiveListItem(itemId);
                this.onListItemSelect(itemId, 'subLeagueList');
            } else {
                this.loadDefaultLeague();
            }
        }
    },

    loadDefaultLeague: function () {
        this.setActiveList('mainList');
        var leagues = FSS.firebase.database().ref('LEAGUE');
        leagues.once('value').then(this.loadLeagueList.bind(this));
    },

    loadList: function (snapshot, reference) {
        debugger;
        //noinspection JSUnresolvedFunction
        let league = snapshot.val();
        let leagues = FSS.Util.safeGet(league, 'SUB_LEAGUE');
        var isActiveList = reference !== this.getActiveList();
        if (leagues) {
            leagues = this.mixins.prepare.prepareLeaguesData(leagues);

            var hasItems = !!(leagues && leagues.length);
            if (hasItems) {
                let leagueList = this.findList(reference);

                leagueList.setRootId(snapshot.key);

                var controller = leagueList.getController();

                var activeLeague = this.getActiveLeague()[reference === 'teamList' ? 'team' : 'subLeague'];
                controller.setActiveListItem(activeLeague);
                this.setActiveList(reference);

                controller.loadListData(leagues, 'teamList');
            }
            debugger;
            this.fireEvent('expandList', hasItems && !isActiveList, reference);
        }
        else {
            debugger;
            this.fireEvent('expandList', !isActiveList, reference);
            this.setMasked(false);
        }
    },

    findList: function (reference) {
        var component = this.lookup(reference);
        if (!component) {
            component = this.lookup(reference + 'Panel').lookup(reference);
        }
        return component;
    },

    onMainListSelectRouteHandler: function (list, child) {
        this.setActiveList('leagueList');
        this.redirectTo('FSS/browser/' + child.record.id);
    },

    onSubListSelectRouteHandler: function (list, child) {
        this.setActiveList('subLeagueList');
        let rootId = this.findList('subLeagueList').getRootId();
        this.redirectTo('FSS/browser/' + rootId + '/' + child.record.id);
    },

    onTeamListSelectRouteHandler: function (list, child) {
        this.setActiveList('teamList');
        let subId = this.findList('subLeagueList').getRootId();
        let rootId = this.findList('teamList').getRootId();
        this.redirectTo('FSS/browser/' + subId + '/' + rootId + '/' + child.record.id);
    }
});