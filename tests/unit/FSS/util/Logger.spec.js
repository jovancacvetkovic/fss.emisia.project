describe('FSS.util.Logger', function () {
    //reusable scoped variable
    // noinspection JSValidateTypes
    Ext.require('FSS.util.Logger');
    var Logger = FSS.util.Logger;

    describe('should not fail on warn', function () {
        it('expect correct params to be passed', function () {
            expect('warn').toMatchExpectedParams(Logger);
            Logger.warn('string');
        });

        it('should not fail on warn', function () {
            expect('warn').toPass(Logger, ['string']);
        });
    });

    describe('should not fail on error', function () {
        it('expect correct params to be passed', function () {
            expect('error').toMatchExpectedParams(Logger);
            Logger.error('string');
        });

        it('should not fail on error', function () {
            expect('error').toPass(Logger, ['string']);
        });
    });

    describe('should not fail on info', function () {
        it('expect correct params to be passed', function () {
            expect('info').toMatchExpectedParams(Logger);
            Logger.info('string');
        });

        it('should not fail on info', function () {
            expect('info').toPass(Logger, ['string']);
        });
    });

    describe('should not fail on infos', function () {
        it('expect correct params to be passed', function () {
            expect('infos').toMatchExpectedParams(Logger);
            Logger.infos(['string']);
        });

        it('should not fail on infos', function () {
            expect('infos').toPass(Logger, ['string']);
        });
    });

    describe('should not fail on errors', function () {
        it('expect correct params to be passed', function () {
            expect('errors').toMatchExpectedParams(Logger);
            Logger.errors(['string']);
        });

        it('should not fail on errors', function () {
            expect('errors').toPass(Logger, ['string']);
        });
    });

    describe('should not fail on print', function () {
        it('expect correct params to be passed', function () {
            expect('print').toMatchExpectedParams(Logger);
            Logger.print('string', 'info');
        });

        it('should not fail on print', function () {
            expect('print').toPass(Logger, ['string', 'info']);
        });
    });

    describe('should not fail on printAll', function () {
        it('expect correct params to be passed', function () {
            expect('printAll').toMatchExpectedParams(Logger);
            Logger.printAll(['asd', '1'], 'info');
        });

        it('should not fail on printAll', function () {
            expect('printAll').toPass(Logger, [['asd', '1'], 'info']);
        });
    });

    describe('should not fail on group', function () {
        it('expect correct params to be passed', function () {
            expect('group').toMatchExpectedParams(Logger);
            Logger.group('string', ['string', 'text'], true);
        });

        it('should not fail on group', function () {
            expect('group').toPass(Logger, ['string', ['string', 'text'], false]);
        });
    });

    describe('should not fail on startTimer', function () {
        it('expect correct params to be passed', function () {
            expect('startTimer').toMatchExpectedParams(Logger);
            Logger.startTimer('timerId');
        });

        it('should not fail on startTimer', function () {
            expect('startTimer').toPass(Logger, ['timerId']);
        });
    });

    describe('should not fail on stopTimer', function () {
        it('expect correct params to be passed', function () {
            expect('stopTimer').toMatchExpectedParams(Logger);
            Logger.stopTimer('timerId');
        });

        it('should not fail on stopTimer', function () {
            expect('stopTimer').toPass(Logger, ['timerId']);
        });
    });

    describe('should not fail on close', function () {
        it('should not fail on close', function () {
            expect('close').toPass(Logger);
        });
    });
});