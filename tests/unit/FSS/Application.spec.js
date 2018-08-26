describe('FSS.Application', function () {
    //reusable scoped variable
    var App = null;

    beforeEach(function () {
        spyOn(Ext, 'getBody').and.callFake(ExtMock.getBody);

        //create a fresh grid for every test to avoid test pollution
        App = FSS.Application.prototype;

        jasmine.addMatchers(matchers);
    });

    it('should not fail on launch', function () {
        expect(function () {
            App.launch();
        }).not.toThrow();
    });

    it('should not fail on onUnmatchedRoute', function () {
        expect(function () {
            App.onUnmatchedRoute('');
        }).not.toThrow();
    });

    describe('should not fail on onAppUpdate', function () {
        beforeEach(function () {
            spyOn(Ext.Msg, 'confirm');
        });

        it('should not fail on onAppUpdate', function () {
            expect(function () {
                App.onAppUpdate();
            }).not.toThrow();
        });
    });

    describe('should not fail on onDenyPermissions', function () {
        it('expect correct params to be passed', function () {
            expect('onDenyPermissions').toPass(App, [{}]);
        });
    });

    describe('should not fail on onFirebaseToken', function () {
        it('expect correct params to be passed', function () {
            expect('onFirebaseToken').toPass(App, ['token']);
        });
    });

    describe('should not fail on onMessageHandler', function () {
        var notification;
        beforeEach(function () {
            notification = {
                title: 'Notification title',
                notification: {
                    title: 'Notification body',
                    message: 'Message body'
                }
            };
            notification = Ext.create('FSS.type.PushMessage', notification);
        });
        it('expect correct params to be passed', function () {
            expect('onMessageHandler').toPass(App, [notification]);
        });
    });

    describe('should not fail on onGrantPermissions', function () {
        beforeEach(function () {
            FSS.messaging = FSS.firebase.messaging();
            spyOn(FSS.messaging, 'getToken').and.returnValue('token');
        });

        it('should not fail on onGrantPermissions', function () {
            expect(function () {
                App.onGrantPermissions();
            }).not.toThrow();
        });
        it('expect to return correct type', function () {
            var result = App.onGrantPermissions();
            expect(result).toMatchResult(App, 'onGrantPermissions');
        });
    });

    it('should not fail on initMessaging', function () {
        // not applicable to tests
    });
    it('should not fail on onProfilesReady', function () {
        // not applicable to tests
    });
});