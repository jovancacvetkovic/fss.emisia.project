describe('FSS.view.desktop.scroller.ScrollerController', function(){
    
    //reusable scoped variable
    var Scroller = null;
    var ScrollerController = null;
    
    //setup/teardown
    beforeEach(function(){
        //create a fresh grid for every test to avoid test pollution
        Scroller = Ext.create('FSS.view.desktop.scroller.Scroller', {
            renderTo: 'test' //see spec-runner.html to see where this is defined
        });
        ScrollerController = Scroller.getController();
        
        jasmine.addMatchers(matchers);
    });
    
    afterEach(function(){
        //destroy the grid after every test so we don't pollute the environment
        Scroller.destroy();
    });
    
    it('should not fail on init', function(){
        expect(function(){
            ScrollerController.init();
        }).not.toThrow();
    });
    it('should not fail on fixLayoutScroll', function(){
        expect(function(){
            ScrollerController.fixLayoutScroll();
        }).not.toThrow();
    });
    it('should not fail on isBodyMasked', function(){
        expect(function(){
            ScrollerController.isBodyMasked();
        }).not.toThrow();
    });
    it('should not fail on isScrollAllowed', function(){
        expect(function(){
            ScrollerController.isScrollAllowed();
        }).not.toThrow();
    });
    
    it('should not fail on getScrollHeight', function(){
        expect(function(){
            ScrollerController.getScrollHeight();
        }).not.toThrow();
    });
    
    it('should not fail on registerScrollEvents', function(){
        expect(function(){
            ScrollerController.registerScrollEvents();
        }).not.toThrow();
    });
    
    it('should not fail on scrollAllTo', function(){
        expect(function(){
            ScrollerController.scrollAllTo();
        }).not.toThrow();
    });
    
    it('should not fail on setLayout', function(){
        expect(function(){
            ScrollerController.setLayout();
        }).not.toThrow();
    });
    
    it('should not fail on setScrollWidth', function(){
        expect(function(){
            ScrollerController.setScrollWidth();
        }).not.toThrow();
    });
    
    it('should not fail on syncLayouts', function(){
        expect(function(){
            ScrollerController.syncLayouts();
        }).not.toThrow();
    });
    
    describe('should not fail on getDefaultDelta', function(){
        it('expect correct params to be passed', function(){
            expect('getDefaultDelta').toMatchExpectedParams(ScrollerController);
            ScrollerController.getDefaultDelta(1);
        });
        
        it('expect to return correct type', function(){
            let result = ScrollerController.getDefaultDelta(1);
            expect(result).toMatchExpectedResult(ScrollerController, 'getDefaultDelta');
        });
    });
    
    describe('should not fail on setScrollBottomMargin', function(){
        it('expect correct params to be passed', function(){
            expect('setScrollBottomMargin').toMatchExpectedParams(ScrollerController);
            ScrollerController.setScrollBottomMargin(1);
        });
    });
    
    describe('should not fail on setScrollTopMargin', function(){
        it('expect correct params to be passed', function(){
            expect('setScrollTopMargin').toMatchExpectedParams(ScrollerController);
            ScrollerController.setScrollTopMargin(1);
        });
    });
});