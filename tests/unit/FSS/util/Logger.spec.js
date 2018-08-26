describe('FSS.util.Logger', function(){
    //reusable scoped variable
    // noinspection JSValidateTypes
    Ext.require('FSS.util.Logger');
    
    //reusable scoped variable
    var Logger = null;
    
    beforeEach(function(){
        debugger;
        Logger = FSS.util.Logger;
    });
    
    describe('should not fail on warn', function(){
        it('expect correct params to be passed', function(){
            expect('warn').toPass(Logger, ['string']);
        });
    });
    
    describe('should not fail on error', function(){
        it('should not fail on error', function(){
            expect('error').toPass(Logger, ['string']);
        });
    });
    
    describe('should not fail on info', function(){
        it('should not fail on info', function(){
            expect('info').toPass(Logger, ['string']);
        });
    });
    
    describe('should not fail on infos', function(){
        it('should not fail on infos', function(){
            expect('infos').toPass(Logger, [['string']]);
        });
    });
    
    describe('should not fail on errors', function(){
        it('should not fail on errors', function(){
            expect('errors').toPass(Logger, [['string']]);
        });
    });
    
    describe('should not fail on print', function(){
        it('should not fail on print', function(){
            expect('print').toPass(Logger, ['string', 'info']);
        });
    });
    
    describe('should not fail on printAll', function(){
        it('should not fail on printAll', function(){
            expect('printAll').toPass(Logger, [['asd', '1'], 'info']);
        });
    });
    
    describe('should not fail on group', function(){
        it('should not fail on group', function(){
            expect('group').toPass(Logger, ['string', ['string', 'text'], true]);
            expect('group').toPass(Logger, ['string', ['string', 'text'], false]);
        });
    });
    
    describe('should not fail on startTimer', function(){
        it('should not fail on startTimer', function(){
            expect('startTimer').toPass(Logger, ['timerId']);
        });
    });
    
    describe('should not fail on stopTimer', function(){
        it('should not fail on stopTimer', function(){
            expect('stopTimer').toPass(Logger, ['timerId']);
        });
    });
    
    describe('should not fail on close', function(){
        it('should not fail on close', function(){
            expect('close').toPass(Logger, []);
        });
    });
});