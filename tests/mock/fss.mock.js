var FSS = FSS ? FSS : {};
FSS.getApplication = function () {
    return {
        getCurrentProfile: function () {
            return false;
        }
    };
};

var FSSMock = FSSMock ? FSSMock : {
    getApplication: function () {
        return {
            getCurrentProfile: function () {
                return false;
            }
        };
    }
};