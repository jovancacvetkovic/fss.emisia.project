describe('FSS.view.desktop.tabpanel.browser.treelist.list.List', function(){
    
    //reusable scoped variable
    var TreeList = null;
    
    beforeEach(function(){
        TreeList = Ext.create('FSS.view.desktop.tabpanel.browser.treelist.list.List', {
            renderTo: 'test'
        });
    });
    
    afterEach(function(){
        TreeList.destroy();
    });
    
    it('should inherit from Ext.dataview.List', function(){
        expect(TreeList.isXType('list')).toEqual(true);
    });
    
    describe('should not fail on getStore', function () {
        it('should not fail on getStore', function () {
            expect('getStore').toPass(TreeList, []);
        });
    });
    
    describe('should not fail on onItemDeselect', function () {
        it('should not fail on onItemDeselect', function () {
            var records = [
                Ext.create('Ext.data.Model', {})
            ];
            expect('onItemDeselect').toPass(TreeList, [records, true]);
            expect('onItemDeselect').toPass(TreeList, [records, false]);
        });
    });
    
    describe('should not fail on onItemSelect', function () {
        it('should not fail on onItemSelect', function () {
            var records = [
                Ext.create('Ext.data.Model', {})
            ];
            expect('onItemSelect').toPass(TreeList, [records, true]);
            expect('onItemSelect').toPass(TreeList, [records, false]);
        });
    });
    
    describe('should not fail on getItemByRecord', function () {
        it('should not fail on getItemByRecord', function () {
            var record = Ext.create('Ext.data.Model', {});
            var htmlEl = document.createElement('div');
            expect('getItemByRecord').toPass(TreeList, [htmlEl, record]);
        });
    
        it('expect to return correct type', function () {
            var record = Ext.create('Ext.data.Model', {});
            var htmlEl = document.createElement('div');
            var result = TreeList.getItemByRecord(htmlEl, record);
            expect(result).toMatchResult(TreeList, 'getItemByRecord');
        });
    });
    
});