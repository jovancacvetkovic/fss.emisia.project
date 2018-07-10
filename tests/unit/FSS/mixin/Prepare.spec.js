describe('FSS.mixin.Prepare', function () {
    //reusable scoped variable
    var Prepare = null;

    beforeEach(function () {
        //create a fresh grid for every test to avoid test pollution
        Prepare = new FSS.mixin.Prepare;
    });

    afterEach(function () {
        Prepare.destroy();
    });

    describe('should not fail on prepareLeaguesData', function () {
        var prepareType;
        beforeEach(function () {
            prepareType = Ext.create('FSS.type.mixin.Prepare', {
                ROOT: 'root',
                NAME: 'name',
                GROUP: 'group'
            });
        });

        it('should not fail on prepareLeaguesData', function () {
            expect('prepareLeaguesData').toPass(Prepare, [[prepareType]]);
        });

        it('expect correct params to be passed', function () {
            expect('prepareLeaguesData').toMatchExpectedParams(Prepare);
            Prepare.prepareLeaguesData([prepareType]);
        });

        it('expect to return correct type', function () {
            var result = Prepare.prepareLeaguesData([prepareType]);
            expect(result).toMatchExpectedResult(Prepare, 'prepareLeaguesData');
        });
    });
});