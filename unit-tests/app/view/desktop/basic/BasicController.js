Ext.require('FSS.view.desktop.basic.Basic');

describe('FSS.view.desktop.basic.BasicController', function(){
    
    //reusable scoped variable
    var Basic = null;
    var BasicController = null;
    
    //setup/teardown
    beforeEach(function(){
        //create a fresh grid for every test to avoid test pollution
        Basic = Ext.create('FSS.view.desktop.basic.Basic', {
            renderTo: 'test' //see spec-runner.html to see where this is defined
        });
        BasicController = Basic.getController();
    });
    
    afterEach(function(){
        //destroy the grid after every test so we don't pollute the environment
        BasicController.destroy();
    });
    
    it('should not fail on init', function(){
        expect(function(){
            BasicController.init();
        }).not.toThrow();
    });
});