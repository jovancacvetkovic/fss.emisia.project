Ext.define('TEST..test.unit..test.view.desktop.basic.Basic', {
    extend: 'TEST.Abstract',
    singleton: true,
    
    appMocks: {
        initialize: {
            args: []
        },
        beforeInitialize: {
            args: []
        },
        hide: {
            args: []
        },
        afterShow: {
            args: []
        },
        updateMode: {
            args: []
        },
        updateImageCls: {
            args: [{
                type: 'string'
            }, {
                type: 'string'
            }]
        },
        updateBackgroundCls: {
            args: [{
                type: 'string'
            }, {
                type: 'string'
            }]
        },
        onTap: {
            args: [{
                type: 'Ext.event.Event'
            }]
        },
        onLoad: {
            args: [{
                type: 'Ext.event.Event'
            }]
        },
        onError: {
            args: [{
                type: 'Ext.event.Event'
            }]
        },
        applySrc: {
            args: [{
                type: 'string'
            }]
        },
        updateSrc: {
            args: [{
                type: 'string'
            }]
        },
        updateWidth: {
            args: [{
                type: 'number'
            }]
        },
        updateHeight: {
            args: [{
                type: 'number'
            }]
        },
        detachListeners: {
            args: []
        },
        doDestroy: {
            args: []
        }
    },
    
    runTests: function(){
        var me = this;
        
        describe(' - Testing beforeInitialize', function(){
            beforeEach(function(){
                me.spyOwnMethodsAndRedirectToMock('beforeInitialize');
            });
            
            it(' - Function will not throw', function(){
                expect(function(){
                    me.appTestObj.beforeInitialize();
                }).not.toThrow();
            });
        });
    }
});