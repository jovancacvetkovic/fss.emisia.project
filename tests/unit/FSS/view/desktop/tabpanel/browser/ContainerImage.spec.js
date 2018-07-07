describe('FSS.view.desktop.tabpanel.browser.ContainerImage', function(){
    
    //reusable scoped variable
    var image = null;
    
    beforeEach(function(){
        if (image) {
            image.destroy();
        }
        image = Ext.create('FSS.view.desktop.tabpanel.browser.ContainerImage', {
            items: [],
            renderTo: 'test'
        });
    });
    
    afterEach(function(){
        image.destroy();
    });
    
    it('should inherit from Ext.Container', function(){
        expect(image.isXType('container')).toEqual(true);
    });
    
    it('function `beforeInitialize` will not throw', function(){
        expect(function(){
            image.beforeInitialize();
        }).not.toThrow();
    });
    
    it('function `initialize` will not throw', function(){
        expect(function(){
            image.initialize();
        }).not.toThrow();
    });
    
    describe('function `hide` will not throw', function(){
        it('! isDestroying', function(){
            expect(function(){
                image.hide();
            }).not.toThrow();
        });
        
        it('isDestroying', function(){
            expect(function(){
                image.isDestroying = true;
                image.hide();
            }).not.toThrow();
        });
    });
    
    describe('function `afterShow` will not throw', function(){
        it('! hiddenSrc', function(){
            expect(function(){
                image.afterShow();
            }).not.toThrow();
        });
        
        it('hiddenSrc', function(){
            expect(function(){
                image.hiddenSrc = 'src://some-src';
                image.afterShow();
            }).not.toThrow();
        });
    });
    
    describe('function `updateMode` will not throw', function(){
        it('! imageObject', function(){
            expect(function(){
                image.updateMode();
            }).not.toThrow();
        });
        
        it('imageObject', function(){
            expect(function(){
                image.imageObject = new Image();
                image.updateMode();
            }).not.toThrow();
        });
    });
    
    describe('function `updateImageCls` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                image.updateImageCls();
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'updateImageCls').and.callFake(function(oldCls, newCls){
                expect(typeof arguments[0]).toEqual('string');
                expect(typeof arguments[1]).toEqual('string');
            });
        });
    });
    
    describe('function `updateBackgroundCls` will', function(){
        it(' not throw when function is called', function(){
            expect(function(){
                image.updateBackgroundCls();
            }).not.toThrow();
        });
        
        it(' not throw when function is called with expected params', function(){
            spyOn(image, 'updateBackgroundCls').and.callFake(function(oldCls, newCls){
                expect(typeof arguments[0]).toEqual('string');
                expect(typeof arguments[1]).toEqual('string');
            });
            
            image.updateBackgroundCls('old-cls', 'new-cls');
        });
    });
    
    describe('function `onTap` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                image.onTap();
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'onTap').and.callFake(function(e){
                expect(arguments[0].$className).toEqual('Ext.event.Event');
            });
            
            image.onTap(new Ext.event.Event({}));
        });
    });
    
    describe('function `onLoad` will not throw', function(){
        beforeEach(function(){
            image.imageObject = new Image();
        });
        
        it('when function is called', function(){
            expect(function(){
                var event = new Ext.event.Event({});
                image.onLoad(event);
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'onLoad').and.callFake(function(e){
                expect(arguments[0].$className).toEqual('Ext.event.Event');
            });
            
            image.onLoad(new Ext.event.Event({}));
        });
    });
    
    describe('function `onError` will not throw', function(){
        beforeEach(function(){
            image.imageObject = new Image();
        });
        
        it('when function is called', function(){
            expect(function(){
                var event = new Ext.event.Event({});
                image.onError(event);
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'onError').and.callFake(function(e){
                expect(arguments[0].$className).toEqual('Ext.event.Event');
            });
            
            image.onError(new Ext.event.Event({}));
        });
    });
    
    describe('function `applySrc` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                image.applySrc('http://google.com');
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'applySrc').and.callFake(function(src){
                expect(typeof arguments[0]).toEqual('string');
            });
            
            image.applySrc('sec-url');
        });
        
        it('when function is called and returned `string`', function(){
            var src = image.applySrc('sec-url');
            expect(typeof src).toEqual('string');
        });
    });
    
    describe('function `updateSrc` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                image.updateSrc('http://google.com');
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'updateSrc').and.callFake(function(src){
                expect(typeof arguments[0]).toEqual('string');
            });
            
            image.updateSrc('sec-url');
        });
    });
    
    describe('function `updateWidth` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                image.updateWidth(100);
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'updateWidth').and.callFake(function(src){
                expect(typeof arguments[0]).toEqual('number');
            });
            
            image.updateWidth(100);
        });
    });
    
    describe('function `updateHeight` will not throw', function(){
        it('when function is called', function(){
            expect(function(){
                image.updateHeight(100);
            }).not.toThrow();
        });
        
        it('when function is called with expected params', function(){
            spyOn(image, 'updateHeight').and.callFake(function(src){
                expect(typeof arguments[0]).toEqual('number');
            });
            
            image.updateHeight(100);
        });
    });
    
    describe('function `detachListeners` will not throw', function(){
        it('imageObject', function(){
            expect(function(){
                image.detachListeners();
            }).not.toThrow();
        });
        
        it('!imageObject', function(){
            expect(function(){
                delete image.imageObject;
                image.detachListeners();
            }).not.toThrow();
        });
    });
});