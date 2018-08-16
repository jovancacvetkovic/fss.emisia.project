/**
 * Browser tree-list controller
 * Tree-list data-view contains three sub-lists loaded via routes
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
        /**
         * @private
         * @cfg {String}
         * Currently selected league
         */
        activeLeague: undefined,

        /**
         * @private
         * @cfg {String[]}
         * Currently active/expanded league lists
         */
        activeLeagues: undefined,

        /**
         * @private
         * @cfg {String[]}
         * All available lists
         */
        availableLists: [
            'leagueList',
            'subLeagueList',
            'teamList'
        ],

        /**
         * @private
         * @cfg {String[]}
         * Firebase url templates
         */
        dbUrlTemplates: [
            'LEAGUE',
            'LEAGUE/{0}',
            'LEAGUE/{0}/SUB_LEAGUE/{1}'
        ],

        /**
         * @private
         * @cfg {String}
         * Previously selected list
         */
        previousLeague: undefined,

        /**
         * @private
         * @cfg {Boolean}
         * Tells list to load default league list
         * if any league from default list is selected
         */
        defaultLeague: true,

        /**
         * @private
         * @cfg {String[]}
         * List of all list per route
         * This is after parsing route and set as array of lists that will be loaded
         */
        originalLeagues: undefined
    },

    /**
     * Sets a list of active lists
     * @param {String[]} leagues List of list names
     */
    setActiveLeagues: function (leagues) {
        this.setViewportMasked(true);

        // set active leagues
        this._activeLeagues = leagues;
        if (Ext.isArray(leagues)) { // if it is not initial config route then try to load leagues
            var leagueList = this.findList('leagueList');
            var store = leagueList.getViewModel().getStore('list');

            var isLoaded = store.getCount();
            if (!isLoaded) { // first list is not loaded

                this.setActiveLeague(null); // there is no activeLeague before first list is loaded
                var dbQueryUrl = this.getDbUrl('', '');
                this.loadLeague(dbQueryUrl);
            }
            else {
                var activeCount = this._activeLeagues.length;
                var activeLeague = this._activeLeagues[activeCount - 1];
                this.setActiveLeague(activeLeague);
                this.onListItemSelect(activeLeague);
            }
        }
    },

    /**
     * Returns activeList index
     * @returns {Number} listIndex
     */
    getListIndex: function () {
        var leagues = this.getOriginalLeagues();
        var league = this.getActiveLeague();
        var listIndex = leagues.indexOf(league);
        listIndex = listIndex === -1 ? 0 : (++listIndex);

        return listIndex;
    },

    /**
     * Returns league firebase url
     * @param {String} previousLeague Previously selected league identification string
     * @param {String} leagueId League identification string
     * @returns {String} url Firebase url
     */
    getDbUrl: function (previousLeague, leagueId) {
        var urlTemplates = this.getDbUrlTemplates();
        var tplNo = this.getListIndex();
        var urlTpl = urlTemplates[tplNo];
        var url;

        if (urlTpl) { // no or one league selected
            url = Ext.String.format(urlTpl, leagueId);

            // more then one league selected
            var match = urlTpl.match(/{.}/g);
            if (match && match.length > 1) {
                url = Ext.String.format(urlTpl, previousLeague, leagueId);
            }
        }

        return url;
    },

    /**
     * Sends request for league list and loads league store if request was successful
     * @param {String} url Request url
     */
    loadLeague: function (url) {
        Ext.Ajax.request({
            isFirebase: true,
            url: url,
            success: this.loadLeagueList,
            scope: this
        });
    },

    /**
     * Loads league list
     * @param {FSS.type.ajax.Response} response
     */
    loadLeagueList: function (response) {
        var rawLeagues = JSON.parse(response.responseText);

        // prepare leagues data
        var subLeagues = FSS.Util.safeGet(rawLeagues, 'SUB_LEAGUE');
        var leagues = subLeagues ? subLeagues : rawLeagues;
        leagues = this.mixins.prepare.prepareLeaguesData(leagues);

        var leagueList = this.getActiveList();
        var leagueController = leagueList.getController();
        var previousActiveLeague = this.getActiveList().getSelectedId();

        var activeLeague = this.pullActiveLeague(leagueList);
        this.setActiveLeague(activeLeague);

        if (Ext.isArray(leagues) && leagues.length) {
            leagueController.setActiveListItem(activeLeague);

            // load data if it is not already loaded
            var store = leagueList.getViewModel().getStore('list');
            if (!store.getCount() || previousActiveLeague !== activeLeague) {
                leagueController.loadListData(leagues);
                this.expandSubLists(leagueList, leagueController);
            }
            else {
                // if data is already loaded then just select item
                activeLeague = this.pullActiveLeague(leagueList);
                this.onListItemSelect(activeLeague);
                leagueController.fireEvent('expandList', true, leagueList.reference);

                if (!store.findRecord('id', this.getActiveLeague())) {
                    leagueList.getSelectable().deselectAll();

                    this.expandSubLists(leagueList, leagueController);
                }
            }

            activeLeague = this.getActiveLeague();
            var nextLeague = this.getNextLeague(activeLeague);
            if (!nextLeague && activeLeague) { // if there is selected item and there id no more lists to load, then show selected item details
                this.fireEvent('e_loadDetails', activeLeague, this.getDefaultLeague() && this.getAvailableLists().indexOf(leagueList.reference) === 0);
            }
        }
        else {
            if (!this.getActiveLeagues().length) { // if there are no more lists to load collapse lists that should not be visible
                leagueController.fireEvent('expandList', false, leagueList.reference);
                this.expandSubLists(leagueList, leagueController);
            }

            if (activeLeague) { // if there is selected item then show its details
                this.fireEvent('e_loadDetails', activeLeague, this.getDefaultLeague());
            }
        }

        this.setViewportMasked(false);
    },

    /**
     * Expand/collapse all subLists
     * @param {FSS.view.desktop.tabpanel.browser.treelist.list.List} leagueList
     * @param {FSS.view.desktop.tabpanel.browser.treelist.list.ListController} leagueController
     */
    expandSubLists: function (leagueList, leagueController) {
        var availableLists = this.getAvailableLists();
        var leagueIndex = availableLists.indexOf(leagueList.reference);
        if (leagueIndex !== -1) { // collapse sub lists also
            var nextLeagueReference = availableLists[leagueIndex + 1];
            if (nextLeagueReference) {
                leagueController.fireEvent('expandList', false, nextLeagueReference);
            }
        }
    },

    /**
     * Returns next league if there is one
     * @param {String} activeLeague Currently active league identification string
     * @returns {String} nextLeague Next league identification string
     */
    getNextLeague: function (activeLeague) {
        var nextLeague;
        var originalLeagues = this.getOriginalLeagues();
        var index = Ext.Array.indexOf(originalLeagues, activeLeague);
        if (index !== -1) {
            nextLeague = originalLeagues[index + 1];
        }

        return nextLeague;
    },

    /**
     * Get current list selected league identification string
     * @param {FSS.view.desktop.tabpanel.browser.treelist.list.List} list
     * @returns {String} selectedId Selected league identification string
     */
    getSelectedId: function (list) {
        var selectedId;
        // noinspection JSUnresolvedFunction
        var selected = list.getSelectable().getSelectedRecord();
        if (selected) {
            selectedId = selected.get('id');
        }

        return selectedId;
    },

    /**
     * Returns active league and pulls it from a list of active leagues
     * @returns {String} activeLeague
     */
    pullActiveLeague: function (leagueList) {
        var activeLeague = this.getActiveLeague();
        this.setPreviousLeague(activeLeague);

        var leagues = this.getActiveLeagues();
        if (leagues) {
            activeLeague = leagues.pop();

            if (activeLeague) {
                this.setActiveLeague(activeLeague);
            }

            leagueList.setSelectedId(this.getPreviousLeague());

            // noinspection JSUnusedGlobalSymbols
            this._activeLeagues = leagues;
        }

        return activeLeague ? activeLeague : null;
    },

    /**
     * Returns selected list reference
     * @returns {FSS.view.desktop.tabpanel.browser.treelist.list.List}
     */
    getActiveList: function () {
        var lists = this.getAvailableLists();
        var tplNo = this.getListIndex();

        var reference = lists[tplNo];
        return reference ? this.findList(reference) : null;
    },

    /**
     * Finds and returns list reference
     * @param {String} reference List reference
     * @returns {FSS.view.desktop.tabpanel.browser.treelist.list.List} list
     */
    findList: function (reference) {
        var list = this.lookup(reference);
        if (!list) { // there can be nested list within collapsible panel
            list = this.lookup(reference + 'Panel').lookup(reference);
        }
        return list;
    },

    /**
     * Handles list item selection and load selected league list
     * @param {String} leagueId League identification string
     */
    onListItemSelect: function (leagueId) {
        var activeLeague = this.getActiveLeague();
        if (!activeLeague && leagueId) {
            this.setActiveLeague(leagueId);
            activeLeague = this.getActiveLeague();
        }

        if (leagueId && (this.getActiveLeagues().length || activeLeague)) {
            var previousLeague = this.getPreviousLeague();

            var dbQueryUrl = this.getDbUrl(previousLeague, leagueId);
            if (dbQueryUrl) {
                this.loadLeague(dbQueryUrl);
            }
        }
        else {
            this.setViewportMasked(false);
        }
    },
    /**
     * Main list select handler
     * @param {FSS.view.desktop.tabpanel.browser.treelist.list.List} list
     * @param {Ext.list.Location} listLocationItem
     */
    onMainListSelectRouteHandler: function (list, listLocationItem) {
        if (listLocationItem.record) {
            this.setDefaultLeague(listLocationItem.record.id);
            this.redirectTo('FSS/browser/' + listLocationItem.record.id);
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
}, function (Cls) {
    Cls.mocks = {
        onMainListSelectRouteHandler: {
            args: {
                0: 'FSS.view.desktop.tabpanel.browser.treelist.list.List',
                1: 'Ext.list.Location'
            }
        },
        onSubListSelectRouteHandler: {
            args: {
                0: 'FSS.view.desktop.tabpanel.browser.treelist.list.List',
                1: 'Ext.list.Location'
            }
        },
        onTeamListSelectRouteHandler: {
            args: {
                0: 'FSS.view.desktop.tabpanel.browser.treelist.list.List',
                1: 'Ext.list.Location'
            }
        },
        loadLeague: {
            args: {
                0: 'string'
            }
        },
        loadLeagueList: {
            args: {
                0: 'FSS.type.ajax.Response'
            }
        },
        getSelectedId: {
            args: {
                0: 'FSS.view.desktop.tabpanel.browser.treelist.list.List'
            },
            returns: 'string|undefined'
        },
        pullActiveLeague: {
            returns: 'string|undefined'
        },
        getNextLeague: {
            args: {
                0: 'string'
            },
            returns: 'string|undefined'
        },
        getActiveList: {
            returns: 'FSS.view.desktop.tabpanel.browser.treelist.list.List'
        },
        onListItemSelect: {
            args: {
                0: 'string'
            }
        },
        setActiveLeagues: {
            args: {
                0: 'string[]'
            }
        },
        findList: {
            args: {
                0: 'string'
            },
            returns: 'FSS.view.desktop.tabpanel.browser.treelist.list.List'
        },
        getDbUrl: {
            args: {
                0: 'string',
                1: 'string'
            },
            returns: 'string'
        }
    };
});