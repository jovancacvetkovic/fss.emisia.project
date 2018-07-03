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
        activeLeagues: undefined,
        activeLists: [
            'leagueList',
            'subLeagueList',
            'teamList'
        ],
        listCount: 0,
        dbUrlTemplates: [
            'LEAGUE',
            'LEAGUE/{0}',
            'LEAGUE/{0}/SUB_LEAGUE/{1}'
        ],
        previousLeague: undefined,
        defaultLeague: true
    },

    loadDefaultLeague: function (itemId) {
        var dbQueryUrl = this.getDbUrl(undefined, itemId);
        this.loadLeague(dbQueryUrl);
    },

    loadLeague: function (url) {
        Ext.Ajax.request({
            isFirebase: true,
            url: url,
            success: this.loadLeagueList,
            scope: this
        });
    },

    loadLeagueList: function (response) {
        var rawLeagues = JSON.parse(response.responseText);
        var leagueList = this.getActiveList();

        var subLeagues = FSS.Util.safeGet(rawLeagues, 'SUB_LEAGUE');
        var leagues = subLeagues ? subLeagues : rawLeagues;
        leagues = this.mixins.prepare.prepareLeaguesData(leagues);

        var activeLeague = this.getActiveLeague();
        var leagueController = leagueList.getController();
        leagueController.setActiveListItem(activeLeague);
        if (Ext.isArray(leagues) && leagues.length) {
            leagueController.loadListData(leagues);
            this.fireEvent('e_loadDetails', activeLeague, false);
        }
        else {
            var previousLeague = this.getPreviousLeague();
            if (previousLeague !== this.getSelectedId(leagueList)) {
                this.expandLists();
            }

            this.fireEvent('e_loadDetails', previousLeague, this.getDefaultLeague());
        }
        this.setViewportMasked(false);
    },

    expandLists: function () {
        var leagueList = this.getActiveList();
        var activeLeagues = this.getActiveLeagues();
        if (activeLeagues.length) {
            var remainingListsIndex = activeLeagues.length + 1;
            var activeLists = this.getActiveLists();
            var currentListIndex = activeLists.indexOf(leagueList.reference);

            while (currentListIndex <= remainingListsIndex) {
                this.fireEvent('expandList', false, activeLists[currentListIndex]);
                currentListIndex++;
            }
        }
        else {
            this.fireEvent('expandList', false, leagueList.reference);
        }
    },

    getSelectedId: function (list) {
        var selected = list.getSelectable().getSelectedRecord();
        if (selected) {
            selected = selected.get('id')
        }

        return selected;
    },

    pullActiveLeague: function () {
        var activeLeague = this.getActiveLeague();
        this.setPreviousLeague(activeLeague);

        var leagues = this.getActiveLeagues();
        activeLeague = leagues.pop();
        if (activeLeague) {
            this.setActiveLeague(activeLeague);
        }

        var leagueList = this.getActiveList();
        leagueList.setSelectedId(this.getPreviousLeague());

        this._activeLeagues = leagues;

        return activeLeague;
    },

    getDbUrl: function (previousLeague, itemId) {
        var urlTemplates = this.getDbUrlTemplates();
        var listCount = this.getListCount();
        var leagues = this.getActiveLeagues();
        var tplNo = listCount - leagues.length - 1;
        var urlTpl = urlTemplates[tplNo];
        var url = Ext.String.format(urlTpl, itemId);
        var match = urlTpl.match(/{.}/g);
        if (match && match.length > 1) {
            url = Ext.String.format(urlTpl, previousLeague, itemId);
        }
        return url;
    },

    getActiveList: function () {
        var lists = this.getActiveLists();
        var listCount = this.getListCount();
        var leagues = this.getActiveLeagues();
        var listNo = listCount - leagues.length - 1;

        return this.findList(lists[listNo]);
    },

    onListItemSelect: function (itemId) {
        var previousLeague = this.getPreviousLeague();
        this.pullActiveLeague();

        var dbQueryUrl = this.getDbUrl(previousLeague, itemId);
        this.loadLeague(dbQueryUrl);
    },

    setActiveLeagues: function (leagues) {
        this.setViewportMasked(true);

        //noinspection JSUnusedGlobalSymbols
        this._activeLeagues = leagues;
        if (leagues) {
            this.setListCount(leagues.length);
            var defaultLeague = this.pullActiveLeague();

            var leagueList = this.findList('leagueList');
            var isDefaultLeagueLoaded = leagueList.getStore().getCount();

            if (isDefaultLeagueLoaded) {
                leagueList.getController().setActiveListItem(defaultLeague);
                this.onListItemSelect(defaultLeague);
            } else {
                this.loadDefaultLeague(defaultLeague);
            }
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
        if (child.record) {
            this.setDefaultLeague(child.record.id);
            this.redirectTo('FSS/browser/' + child.record.id);
        }
    },

    onSubListSelectRouteHandler: function (list, child) {
        this.setDefaultLeague(null);

        if (child.record) {
            var leagueList = this.findList('leagueList');
            var selectedId = this.getSelectedId(leagueList);
            this.redirectTo('FSS/browser/' + selectedId + '/' + child.record.id);
        }
    },

    onTeamListSelectRouteHandler: function (list, child) {
        this.setDefaultLeague(null);

        if (child.record) {
            var leagueList = this.findList('leagueList');
            var subId = this.getSelectedId(leagueList);

            var subLeagueList = this.findList('subLeagueList');
            var selectedId = this.getSelectedId(subLeagueList);
            this.redirectTo('FSS/browser/' + subId + '/' + selectedId + '/' + child.record.id);
        }
    }
});