describe('FSS.view.desktop.tabpanel.browser.treelist.TreeListController', function () {

    //reusable scoped variable
    var TreeList = null;
    var TreeListController = null;

    beforeEach(function () {
        TreeList = Ext.create('FSS.view.desktop.tabpanel.browser.treelist.TreeList', {
            renderTo: 'test'
        });
        TreeListController = TreeList.getController();

        jasmine.addMatchers(matchers);
    });

    afterEach(function () {
        TreeList.destroy();
    });

    it('should inherit from Ext.Panel', function () {
        expect(TreeList.isXType('panel')).toEqual(true);
    });

    describe('should not fail on loadDefaultLeague', function () {
        it('expect correct params to be passed', function () {
            expect('loadDefaultLeague').toMatchExpectedParams(TreeListController);
            TreeListController.loadDefaultLeague('string');
        });

        it('should not fail on loadDefaultLeague', function () {
            expect('loadDefaultLeague').toPass(TreeListController, ['string']);
        });

        it('should not fail on loadDefaultLeague with activeLeagues', function () {
            TreeListController.setActiveLeagues(['string']);
            expect('loadDefaultLeague').toPass(TreeListController, ['string']);
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

        it('should not fail on loadDefaultLeague with activeLeagues', function () {
            TreeListController.setActiveLeagues(['string']);
            expect('loadDefaultLeague').toPass(TreeListController, ['string']);
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
    });
});