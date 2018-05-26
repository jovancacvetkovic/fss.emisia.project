describe('FSS.view.desktop.basic.ContainerImage', function(){
    
    //reusable scoped variable
    var image = null;
    
    //setup/teardown
    beforeEach(function(){
        //create a fresh grid for every test to avoid test pollution
        image = Ext.create('FSS.view.desktop.basic.ContainerImage', {
            renderTo: 'test' //see spec-runner.html to see where this is defined
        });
    });
    
    afterEach(function(){
        //destroy the grid after every test so we don't pollute the environment
        image.destroy();
    });
    
    it('should inherit from Ext.Container', function(){
        expect(image.isXType('container')).toEqual(true);
    });
});