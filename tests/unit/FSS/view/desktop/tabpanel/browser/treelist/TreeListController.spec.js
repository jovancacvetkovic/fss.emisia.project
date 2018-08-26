describe('FSS.view.desktop.tabpanel.browser.treelist.TreeListController', function(){
    
    //reusable scoped variable
    var TreeList = null;
    var TreeListController = null;
    
    beforeEach(function(){
        TreeList = Ext.create('FSS.view.desktop.tabpanel.browser.treelist.TreeList', {
            renderTo: 'test'
        });
        TreeListController = TreeList.getController();
        TreeListController.setOriginalLeagues([]);
        
        self.view = TreeList;
        self.viewController = TreeListController;
    });
    
    afterEach(function(){
        TreeList.destroy();
        TreeListController.destroy();
    });
    
    it('should inherit from Ext.Panel', function(){
        expect(TreeList.isXType('panel')).toEqual(true);
    });
    
    describe('should not fail on loadLeague', function(){
        beforeEach(function(){
            spyOn(Ext.Ajax, 'request');
        });
        it('expect correct params to be passed', function(){
            expect('loadLeague').toPass(TreeListController, ['string']);
        });
    });
    
    describe('should not fail on getSelectedId', function(){
        var list;
        beforeEach(function(){
            list = TreeList.lookup('leagueList');
        });
        
        it('should not fail on getSelectedId', function(){
            expect('getSelectedId').toPass(TreeListController, [list]);
        });
        
        it('should not fail on getSelectedId with selected record', function(){
            var store = list.getViewModel().getStore('list');
            list.setStore(store);
            
            var record = store.add({id: 'string'});
            list.getSelectable().select(record);
            expect('getSelectedId').toPass(TreeListController, [list]);
        });
        
        it('expect to return correct type', function(){
            var result = TreeListController.getSelectedId(list);
            expect(result).toMatchResult(TreeListController, 'getSelectedId');
        });
    });
    
    describe('should not fail on getDbUrl', function(){
        it('should not fail on getDbUrl', function(){
            expect('getDbUrl').toPass(TreeListController, ['string', 'string']);
        });
        
        it('should not fail on getDbUrl with activeLeagues set', function(){
            TreeListController.setActiveLeagues(['string']);
            expect('getDbUrl').toPass(TreeListController, ['string', 'string']);
        });
        
        it('should not fail on getDbUrl with activeLeagues set with sub-leagues', function(){
            TreeListController.setActiveLeagues(['string', 'string', 'string']);
            expect('getDbUrl').toPass(TreeListController, ['string', 'string']);
        });
        
        it('should not fail on getDbUrl with activeLeagues set with sub-leagues 3', function(){
            TreeListController.setActiveLeagues(['string1', 'string2', 'string3']);
            expect('getDbUrl').toPass(TreeListController, ['string', 'string3']);
        });
        
        it('expect to return correct type', function(){
            var result = TreeListController.getDbUrl('string', 'string');
            expect(result).toMatchResult(TreeListController, 'getDbUrl');
        });
    });
    
    describe('should not fail on pullActiveLeague', function(){
        var list;
        beforeEach(function(){
            list = TreeList.lookup('leagueList');
            getSpyOnReady(TreeListController, 'pullActiveLeague');
        });
        
        it('should not fail on pullActiveLeague', function(){
            expect('pullActiveLeague').toPass(TreeListController, [list]);
        });
        
        it('expect to return correct type', function(){
            var result = TreeListController.pullActiveLeague(list);
            expect(result).toMatchResult(TreeListController, 'pullActiveLeague');
        });
        
        it('expect to return correct type with activeLeagues set', function(){
            var result = TreeListController.pullActiveLeague(list);
            TreeListController.setActiveLeague(null);
            TreeListController.setActiveLeagues(null);
            expect(result).toMatchResult(TreeListController, 'pullActiveLeague');
        });
    });
    
    describe('should not fail on getNextLeague', function(){
        it('should not fail on getNextLeague', function(){
            expect('getNextLeague').toPass(TreeListController, ['string']);
        });
        
        it('expect correct params to be passed', function(){
            expect('getNextLeague').toPass(TreeListController, ['string']);
        });
        
        it('expect to return correct type', function(){
            var result = TreeListController.getNextLeague('string');
            expect(result).toMatchResult(TreeListController, 'getNextLeague');
        });
        
        it('expect to return correct type with originalLeagues set', function(){
            TreeListController.setActiveLeague('string');
            TreeListController.setActiveLeagues(['string', 'string']);
            TreeListController.setOriginalLeagues(['string', 'string']);
            
            var result = TreeListController.getNextLeague('string');
            expect(result).toMatchResult(TreeListController, 'getNextLeague');
        });
    });
    
    describe('should not fail on getActiveList', function(){
        it('should not fail on getActiveList', function(){
            expect('getActiveList').toPass(TreeListController, []);
        });
        
        it('should not fail on getActiveList with activeLeagues set', function(){
            //TreeListController.setActiveLeagues(['string', 'string']);
            expect('getActiveList').toPass(TreeListController, []);
        });
        
        it('expect to return correct type for getActiveList', function(){
            var result = TreeListController.getActiveList();
            expect(result).toMatchResult(TreeListController, 'getActiveList');
        });
    });
    
    describe('should not fail on onListItemSelect', function(){
        it('should not fail on onListItemSelect', function(){
            expect('onListItemSelect').toPass(TreeListController, ['string']);
        });
    });
    
    describe('should not fail on loadLeagueList', function(){
        var response;
        beforeEach(function(){
            spyOn(Ext.Ajax, 'request');
            spyOn(TreeListController, 'fireEvent');
            
            response = Ext.create('FSS.type.ajax.Response', {
                responseText: JSON.stringify(MockService.jsonMock)
            });
            
            TreeList.store = TreeList.getViewModel().getStore('list');
            
            getSpyOnReady(TreeListController, 'loadLeagueList');
        });
        
        it('expect correct params to be passed', function(){
            expect('loadLeagueList').toPass(TreeListController, [response]);
        });
        
        it('should not fail on loadLeagueList with activeLeagues', function(){
            expect('loadLeagueList').toPass(TreeListController, [response]);
        });
        
        it('should not fail on loadLeagueList without subLeagues', function(){
            var json = MockService.jsonMock['FSVOJVODINE']['SUB_LEAGUE'] = [];
            response.responseText = JSON.stringify(json);
            TreeListController.setPreviousLeague('previous');
            
            expect('loadLeagueList').toPass(TreeListController, [response]);
        });
    });
    
    describe('should not fail on setActiveLeagues', function(){
        it('should not fail on setActiveLeagues', function(){
            expect('setActiveLeagues').toPass(TreeListController, [['string']]);
        });
        
        it('should not fail on setActiveLeagues with store loaded', function(){
            var leagueList = TreeListController.findList('leagueList');
            leagueList.getViewModel().getStore('list').add({
                id: 'string',
                name: 'test'
            });
            expect('setActiveLeagues').toPass(TreeListController, [['string']]);
        });
        
        it('expect correct params to be passed to setActiveLeagues', function(){
            expect('setActiveLeagues').toPass(TreeListController, [['string']]);
        });
    });
    
    describe('should not fail on setActiveLeague', function(){
        it('should not fail on setActiveLeague', function(){
            expect('setActiveLeague').toPass(TreeListController, ['string']);
        });
        
        var tests = [null, 'string', {
            league: 'string'
        }];
        
        function createSpecs(spec, message){
            it(message + this.getSuperType(spec), function(){
                expect('setActiveLeague').toPass(TreeListController, [spec]);
            });
        }
        
        for (var index = 0; index < tests.length; index++) {
            createSpecs(tests[index], 'expect correct params to be passed to setActiveLeagues with ');
        }
    });
    
    describe('should not fail on findList', function(){
        it('should not fail on findList', function(){
            expect('findList').toPass(TreeListController, ['leagueList']);
        });
    });
    
    describe('should not fail on listSelectRouteHandler', function(){
        it('should not fail on listSelectRouteHandler', function(){
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
            expect('listSelectRouteHandler').toPass(TreeListController, [leagueList, locationItem]);
        });
    });
});