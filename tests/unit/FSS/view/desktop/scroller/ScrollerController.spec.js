describe('FSS.view.desktop.scroller.ScrollerController', function(){
    
    //reusable scoped variable
    var Scroller = null;
    var ScrollerController = null;
    
    beforeEach(function(){
        Scroller = Ext.create('FSS.view.desktop.scroller.Scroller', {
            renderTo: 'test'
        });
        ScrollerController = Scroller.getController();
    });
    
    afterEach(function(){
        Scroller.destroy();
    });
    
    it('should not fail on fixLayoutScroll', function(){
        expect('fixLayoutScroll').toPass(ScrollerController, []);
    });
    it('should not fail on isBodyMasked', function(){
        expect('isBodyMasked').toPass(ScrollerController, []);
    });
    it('should not fail on isScrollAllowed', function(){
        expect('isScrollAllowed').toPass(ScrollerController, []);
    });
    
    it('should not fail on getScrollHeight', function(){
        expect('getScrollHeight').toPass(ScrollerController, [1]);
    });
    
    it('should not fail on registerScrollEvents', function(){
        expect('registerScrollEvents').toPass(ScrollerController, []);
    });
    
    it('should not fail on scrollAllTo', function(){
        expect('scrollAllTo').toPass(ScrollerController, []);
    });
    
    it('should not fail on setLayout', function(){
        expect('setLayout').toPass(ScrollerController, []);
    });
    
    it('should not fail on setScrollWidth', function(){
        expect('setScrollWidth').toPass(ScrollerController, [1]);
    });
    
    it('should not fail on syncLayouts', function(){
        expect('syncLayouts').toPass(ScrollerController, []);
    });
    
    describe('should not fail on getDefaultDelta', function(){
        it('expect correct params to be passed', function(){
            expect('getDefaultDelta').toPass(ScrollerController, [1]);
        });
        
        it('expect to return correct type', function(){
            var result = ScrollerController.getDefaultDelta(1);
            expect(result).toMatchResult(ScrollerController, 'getDefaultDelta');
        });
    });
    
    describe('should not fail on setScrollBottomMargin', function(){
        it('expect correct params to be passed', function(){
            expect('setScrollBottomMargin').toPass(ScrollerController, [1]);
        });
    });
    
    describe('should not fail on setScrollTopMargin', function(){
        it('expect correct params to be passed', function(){
            expect('setScrollTopMargin').toPass(ScrollerController, [1]);
        });
    });
});