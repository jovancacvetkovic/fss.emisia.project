Ext.define('TEST.FSS.view.desktop.basic.ContainerImage', {
    extend: 'TEST.Abstract',
    
    singleton: true,
    
    appMocks: {
        beforeInitialize: {
            args: []
        }
    },
    
    runTests: function(){
        var me = this;
        
        describe('Scroller main test', function(){
            describe('Testing beforeInitialize method', function(){
                beforeEach(function(){
                    me.spyOwnMethodsAndRedirectToMock('beforeInitialize');
                });
        
                it('Method will not throw when called', function(){
                    expect(function(){
                        me.appTestObj.beforeInitialize();
                    }).not.toThrow();
                });
            });
        });
    }
});