describe('FSS.view.desktop.basic.details.DetailsController', function(){
    
    //reusable scoped variable
    var Details = null;
    var DetailsController = null;
    
    //setup/teardown
    beforeEach(function(){
        //create a fresh grid for every test to avoid test pollution
        Details = Ext.create('FSS.view.desktop.basic.details.Details', {
            renderTo: 'test' //see spec-runner.html to see where this is defined
        });
        DetailsController = Details.getController();
    });
    
    afterEach(function(){
        //destroy the grid after every test so we don't pollute the environment
        DetailsController.destroy();
    });
    
    describe('function `onLoadDetails` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                DetailsController.onLoadDetails('id');
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(DetailsController, 'onLoadDetails').and.callFake(function(src){
                expect(typeof arguments[0]).toEqual('string');
            });
            
            DetailsController.onLoadDetails('id');
        });
    });
    
    describe('function `loadDetails` will not throw', function(){
        let snapshot;
        beforeEach(function(){
            snapshot = {
                val: function(){
                    return {
                        NAME: ''
                    }
                }
            };
        });
        
        it('when function is called', function(){
            expect(function(){
                DetailsController.loadDetails(snapshot);
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(DetailsController, 'loadDetails').and.callFake(function(src){
                expect(typeof arguments[0]).toEqual('object');
            });
            
            DetailsController.loadDetails(snapshot);
        });
    });
});