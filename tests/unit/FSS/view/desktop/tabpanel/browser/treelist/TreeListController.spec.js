describe('FSS.view.desktop.tabpanel.browser.treelist.TreeListController', function () {

    //reusable scoped variable
    var TreeList = null;
    var TreeListController = null;

    beforeEach(function () {
        TreeList = Ext.create('FSS.view.desktop.tabpanel.browser.treelist.TreeList', {
            renderTo: 'test'
        });
        TreeListController = TreeList.getController();
    });

    afterEach(function () {
        TreeList.destroy();
    });

    it('should inherit from Ext.Panel', function () {
        expect(TreeList.isXType('panel')).toEqual(true);
    });

    describe('should not fail on loadDefaultLeague', function () {
        it('should not fail on loadDefaultLeague', function () {
            expect('loadDefaultLeague').toPass(TreeListController, []);
        });

        it('should not fail on loadDefaultLeague with activeLeagues', function () {
            TreeListController.setActiveLeagues(['string']);
            expect('loadDefaultLeague').toPass(TreeListController, []);
        });
    });

    describe('should not fail on expandLists', function () {
        it('should not fail on expandLists', function () {
            expect('expandLists').toPass(TreeListController, []);
        });

        it('should not fail on expandLists with activeLeagues', function () {
            TreeListController.setActiveLeagues(['string', 'string']);
            expect('expandLists').toPass(TreeListController, []);
        });
    });

    describe('should not fail on loadLeague', function () {
        beforeEach(function () {
            spyOn(Ext.Ajax, 'request');
        });
        it('expect correct params to be passed', function () {
            expect('loadLeague').toMatchExpectedParams(TreeListController);
            TreeListController.loadLeague('string');
        });

        it('should not fail on loadLeague', function () {
            expect('loadLeague').toPass(TreeListController, ['string']);
        });
    });

    describe('should not fail on getSelectedId', function () {
        var list;
        beforeEach(function () {
            list = TreeList.lookup('leagueList');
        });
        it('expect correct params to be passed', function () {
            expect('getSelectedId').toMatchExpectedParams(TreeListController);
            TreeListController.getSelectedId(list);
        });

        it('should not fail on getSelectedId', function () {
            expect('getSelectedId').toPass(TreeListController, [list]);
        });

        it('should not fail on getSelectedId with selected record', function () {
            var store = list.getViewModel().getStore('list');
            list.setStore(store);

            var record = store.add({id: 'string'});
            list.getSelectable().select(record);
            expect('getSelectedId').toPass(TreeListController, [list]);
        });

        it('expect to return correct type', function () {
            var result = TreeListController.getSelectedId(list);
            expect(result).toMatchExpectedResult(TreeListController, 'getSelectedId');
        });
    });


    describe('should not fail on getDbUrl', function () {
        it('expect correct params to be passed', function () {
            expect('getDbUrl').toMatchExpectedParams(TreeListController);
            TreeListController.getDbUrl('string', 'string');
        });

        it('should not fail on getDbUrl', function () {
            expect('getDbUrl').toPass(TreeListController, ['string', 'string']);
        });

        it('should not fail on getDbUrl with activeLeagues set', function () {
            TreeListController.setActiveLeagues(['string']);
            expect('getDbUrl').toPass(TreeListController, ['string', 'string']);
        });

        it('should not fail on getDbUrl with activeLeagues set with sub-leagues', function () {
            TreeListController.setActiveLeagues(['string', 'string', 'string']);
            TreeListController.setListCount(5);
            expect('getDbUrl').toPass(TreeListController, ['string', 'string']);
        });

        it('expect to return correct type', function () {
            var result = TreeListController.getDbUrl('string', 'string');
            expect(result).toMatchExpectedResult(TreeListController, 'getDbUrl');
        });
    });

    describe('should not fail on pullActiveLeague', function () {
        it('should not fail on pullActiveLeague', function () {
            expect('pullActiveLeague').toPass(TreeListController, []);
        });

        it('expect to return correct type', function () {
            var result = TreeListController.pullActiveLeague();
            expect(result).toMatchExpectedResult(TreeListController, 'pullActiveLeague');
        });

        it('expect to return correct type with activeLeagues set', function () {
            TreeListController.setActiveLeague('string');
            TreeListController.setActiveLeagues(['string', 'string']);

            var result = TreeListController.pullActiveLeague();
            expect(result).toMatchExpectedResult(TreeListController, 'pullActiveLeague');
        });
    });

    describe('should not fail on getNextLeague', function () {
        it('should not fail on getNextLeague', function () {
            expect('getNextLeague').toPass(TreeListController, ['string']);
        });

        it('expect correct params to be passed', function () {
            expect('getNextLeague').toMatchExpectedParams(TreeListController);
            TreeListController.getNextLeague('string');
        });

        it('expect to return correct type', function () {
            var result = TreeListController.getNextLeague('string');
            expect(result).toMatchExpectedResult(TreeListController, 'getNextLeague');
        });

        it('expect to return correct type with originalLeagues set', function () {
            TreeListController.setActiveLeague('string');
            TreeListController.setActiveLeagues(['string', 'string']);
            TreeListController.setOriginalLeagues(['string', 'string']);

            var result = TreeListController.getNextLeague('string');
            expect(result).toMatchExpectedResult(TreeListController, 'getNextLeague');
        });
    });

    describe('should not fail on getActiveList', function () {
        it('should not fail on getActiveList', function () {
            expect('getActiveList').toPass(TreeListController, []);
        });

        it('should not fail on getActiveList with activeLeagues set', function () {
            TreeListController.setActiveLeagues(['string', 'string']);
            expect('getActiveList').toPass(TreeListController, []);
        });

        it('expect to return correct type for getActiveList', function () {
            var result = TreeListController.getActiveList();
            expect(result).toMatchExpectedResult(TreeListController, 'getActiveList');
        });
    });

    describe('should not fail on onListItemSelect', function () {
        it('should not fail on onListItemSelect', function () {
            expect('onListItemSelect').toPass(TreeListController, ['string']);
        });

        it('expect correct params to be passed to onListItemSelect', function () {
            expect('onListItemSelect').toMatchExpectedParams(TreeListController);
            TreeListController.onListItemSelect('string');
        });
    });

    describe('should not fail on loadLeagueList', function () {
        var response;
        beforeEach(function () {
            spyOn(Ext.Ajax, 'request');
            spyOn(TreeListController, 'fireEvent');

            response = Ext.create('FSS.type.ajax.Response', {
                responseText: JSON.stringify(mockService.jsonMock)
            });
        });
        it('expect correct params to be passed', function () {
            expect('loadLeagueList').toMatchExpectedParams(TreeListController);
            TreeListController.loadLeagueList(response);
        });

        it('should not fail on loadLeagueList', function () {
            expect('loadLeagueList').toPass(TreeListController, [response]);
        });

        it('should not fail on loadLeagueList with activeLeagues', function () {
            TreeListController.setActiveLeagues(['string']);
            expect('loadLeagueList').toPass(TreeListController, [response]);
        });

        it('should not fail on loadLeagueList without subLeagues', function () {
            var json = mockService.jsonMock['FSVOJVODINE']['SUB_LEAGUE'] = [];
            response.responseText = JSON.stringify(json);
            TreeListController.setActiveLeagues(['string']);
            TreeListController.setPreviousLeague('previous');

            expect('loadLeagueList').toPass(TreeListController, [response]);
        });
    });

    describe('should not fail on setActiveLeagues', function () {
        it('should not fail on setActiveLeagues', function () {
            expect('setActiveLeagues').toPass(TreeListController, [['string']]);
        });

        it('should not fail on setActiveLeagues with store loaded', function () {
            var leagueList = TreeListController.findList('leagueList');
            leagueList.getViewModel().getStore('list').add({
                id: 'string',
                name: 'test'
            });
            expect('setActiveLeagues').toPass(TreeListController, [['string']]);
        });

        it('expect correct params to be passed to setActiveLeagues', function () {
            expect('setActiveLeagues').toMatchExpectedParams(TreeListController);
            TreeListController.setActiveLeagues(['string']);
        });
    });

    describe('should not fail on findList', function () {
        it('should not fail on findList', function () {
            expect('findList').toPass(TreeListController, ['leagueList']);
        });

        it('expect correct params to be passed to findList', function () {
            expect('findList').toMatchExpectedParams(TreeListController);
            TreeListController.findList('leagueList');
        });

        it('expect correct params to be passed to findList without reference', function () {
            expect('findList').toMatchExpectedParams(TreeListController);
            TreeListController.findList('subLeagueList');
        });
    });

    describe('should not fail on onMainListSelectRouteHandler', function () {
        it('should not fail on onMainListSelectRouteHandler', function () {
            var leagueList = TreeListController.findList('leagueList');
            var store = leagueList.getViewModel().getStore('list');
            store.add({
                id: 'string',
                name: 'test'
            });
            var items = leagueList.getViewItems();
            var locationItem = Ext.create('Ext.list.Location', {
                item: items[0],
                record: store.getAt(0)
            });
            expect('onMainListSelectRouteHandler').toPass(TreeListController, [leagueList, locationItem.view]);
        });
    });

    describe('should not fail on onSubListSelectRouteHandler', function () {
        it('should not fail on onSubListSelectRouteHandler', function () {
            var leagueList = TreeListController.findList('leagueList');
            var store = leagueList.getViewModel().getStore('list');
            store.add({
                id: 'string',
                name: 'test'
            });
            var items = leagueList.getViewItems();
            var locationItem = Ext.create('Ext.list.Location', {
                item: items[0],
                record: store.getAt(0)
            });
            expect('onSubListSelectRouteHandler').toPass(TreeListController, [leagueList, locationItem.view]);
        });
    });

    describe('should not fail on onTeamListSelectRouteHandler', function () {
        it('should not fail on onTeamListSelectRouteHandler', function () {
            var leagueList = TreeListController.findList('leagueList');
            var store = leagueList.getViewModel().getStore('list');
            store.add({
                id: 'string',
                name: 'test'
            });
            var items = leagueList.getViewItems();
            var locationItem = Ext.create('Ext.list.Location', {
                item: items[0],
                record: store.getAt(0)
            });
            expect('onTeamListSelectRouteHandler').toPass(TreeListController, [leagueList, locationItem.view]);
        });
    });
});