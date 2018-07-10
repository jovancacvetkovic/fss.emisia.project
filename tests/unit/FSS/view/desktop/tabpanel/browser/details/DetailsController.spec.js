describe('FSS.view.desktop.tabpanel.browser.details.DetailsController', function(){
    
    //reusable scoped variable
    var Details = null;
    var DetailsController = null;
    var response;
    beforeEach(function(){
        Details = Ext.create('FSS.view.desktop.tabpanel.browser.details.Details', {
            renderTo: 'test'
        });
        DetailsController = Details.getController();

        spyOn(FSS, 'getApplication').and.callFake(FSSMock.getApplication);

        response = Ext.create('FSS.type.ajax.Response', {
            responseText: JSON.stringify(mockService.jsonMock)
        });
    });
    
    afterEach(function(){
        DetailsController.destroy();
    });
    
    describe('function `onLoadDetails` will not throw', function(){
        it('should not fail on onLoadDetails', function () {
            expect('onLoadDetails').toPass(DetailsController, ['string', true]);
        });

        it('expect correct params to be passed', function () {
            expect('onLoadDetails').toMatchExpectedParams(DetailsController);
            DetailsController.onLoadDetails('string', true);
        });
    });
    
    describe('function `loadDetailsSuccess` will not throw', function(){
        it('should not fail on loadDetailsSuccess', function () {
            expect('loadDetailsSuccess').toPass(DetailsController, [response]);
        });
        it('expect correct params to be passed', function () {
            expect('loadDetailsSuccess').toMatchExpectedParams(DetailsController);
            DetailsController.loadDetailsSuccess(response);
        });
    });
});