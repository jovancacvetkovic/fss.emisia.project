/**
 * Tree-list controller
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
         * @protected
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
         * @cfg {Number}
         * Number of active lists
         */
        listCount: 0,

        /**
         * @private
         * @protected
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
     * Loads default league if there is no route or route has failed
     * @param {String} league League identification string
     */
    loadDefaultLeague: function (league) {
        var dbQueryUrl = this.getDbUrl(undefined, league);
        this.loadLeague(dbQueryUrl);
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
        var leagueList = this.getActiveList();

        // prepare leagues data
        var subLeagues = FSS.Util.safeGet(rawLeagues, 'SUB_LEAGUE');
        var leagues = subLeagues ? subLeagues : rawLeagues;
        leagues = this.mixins.prepare.prepareLeaguesData(leagues);

        var activeLeague = this.getActiveLeague();
        var previousLeague = this.getPreviousLeague();
        var leagueController = leagueList.getController();
        var nextLeague = this.getNextLeague(activeLeague);

        // set active league
        leagueController.setActiveListItem(activeLeague);

        if (Ext.isArray(leagues) && leagues.length) {
            leagueController.loadListData(leagues);
            if (!nextLeague) {
                // if there is no selected item in sub-list then load details
                // for the currently selected league
                this.fireEvent('e_loadDetails', activeLeague, false);
            }
        }
        else {
            if (previousLeague !== this.getSelectedId(leagueList)) {
                // If there are sub leagues expand next list to show them
                // If there are no sub leagues and next list is expanded then collapse nest list
                this.expandLists();

                if (!nextLeague) {
                    // if there is no selected item in sub-list then load details
                    // and details are not already loaded for the same league
                    this.fireEvent('e_loadDetails', previousLeague, this.getDefaultLeague());
                }
            }
        }

        this.setViewportMasked(false);
    },

    /**
     * Expands or collapses list
     * If list has no items it will be collapsed
     */
    expandLists: function () {
        var leagueList = this.getActiveList();
        var activeLeagues = this.getActiveLeagues();
        if (activeLeagues && activeLeagues.length) {
            var remainingListsIndex = activeLeagues.length + 1;
            var availableLists = this.getAvailableLists();
            var currentListIndex = availableLists.indexOf(leagueList.reference);

            while (currentListIndex <= remainingListsIndex) {
                this.fireEvent('expandList', false, availableLists[currentListIndex]);
                currentListIndex++;
            }
        }
        else {
            this.fireEvent('expandList', false, leagueList.reference);
        }
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
    pullActiveLeague: function () {
        var activeLeague = this.getActiveLeague();
        this.setPreviousLeague(activeLeague);

        var leagues = this.getActiveLeagues();
        if (leagues) {
            activeLeague = leagues.pop();
            if (activeLeague) {
                this.setActiveLeague(activeLeague);
            }

            var leagueList = this.getActiveList();
            leagueList.setSelectedId(this.getPreviousLeague());

            // noinspection JSUnusedGlobalSymbols
            this._activeLeagues = leagues;
        }

        return activeLeague;
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
     * Returns league firebase url
     * @param {String} previousLeague Previously selected league identification string
     * @param {String} leagueId League identification string
     * @returns {String} url Firebase url
     */
    getDbUrl: function (previousLeague, leagueId) {
        var url = '';
        var urlTemplates = this.getDbUrlTemplates();
        var listCount = this.getListCount();
        var leagues = this.getActiveLeagues();
        if (leagues && leagues.length) {
            var tplNo = listCount - leagues.length - 1;
            var urlTpl = urlTemplates[tplNo];
            url = Ext.String.format(urlTpl, leagueId);
            var match = urlTpl.match(/{.}/g);
            if (match && match.length > 1) {
                url = Ext.String.format(urlTpl, previousLeague, leagueId);
            }
        }
        return url;
    },

    /**
     * Returns selected list reference
     * @returns {FSS.view.desktop.tabpanel.browser.treelist.list.List}
     */
    getActiveList: function () {
        var listNo = 0;
        var lists = this.getAvailableLists();
        var listCount = this.getListCount();
        var leagues = this.getActiveLeagues();
        if (leagues && leagues.length) {
            listNo = listCount - leagues.length - 1;
        }

        return this.findList(lists[listNo]);
    },

    /**
     * Handles list item selection and load selected league list
     * @param {String} leagueId League identification string
     */
    onListItemSelect: function (leagueId) {
        var previousLeague = this.getPreviousLeague();
        this.pullActiveLeague();

        var dbQueryUrl = this.getDbUrl(previousLeague, leagueId);
        this.loadLeague(dbQueryUrl);
    },

    /**
     * Sets a list of active lists
     * @param {String[]} leagues List of list names
     */
    setActiveLeagues: function (leagues) {
        this.setViewportMasked(true);

        //noinspection JSUnusedGlobalSymbols
        this._activeLeagues = leagues;
        if (leagues) {
            this.setListCount(leagues.length);
            var defaultLeague = this.pullActiveLeague();

            var leagueList = this.findList('leagueList');
            var store = leagueList.getViewModel().getStore('list');
            var isDefaultLeagueLoaded = store.getCount();

            if (isDefaultLeagueLoaded) {
                leagueList.getController().setActiveListItem(defaultLeague);
                this.onListItemSelect(defaultLeague);
            } else {
                this.loadDefaultLeague(defaultLeague);
            }
        }
    },

    /**
     * Finds and returns list reference
     * @param {String} reference List reference
     * @returns {FSS.view.desktop.tabpanel.browser.treelist.list.List} list
     */
    findList: function (reference) {
        var list = this.lookup(reference);
        if (!list) {
            list = this.lookup(reference + 'Panel').lookup(reference);
        }
        return list;
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
        loadDefaultLeague: {
            args: {
                0: 'string'
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
        expandLists: {},
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
            returns : 'FSS.view.desktop.tabpanel.browser.treelist.list.List'
        }
    };
});