Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ext': '../ext/modern/modern/src',
        'Ext.ux': '../ext/packages/ux/modern/src',
        'Ext.ux.ajax': '../ext/packages/ux/src/ajax',
        'FSS': '../app',
        'FSS.overrides': '../overrides'/*,
        'TEST': 'unit'*/
    }
});

//Overriding jasmin method to provide better readability
jasmine.Suite.prototype.getFullName = function(){
    var fullName = this.description;
    for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) {
        if (parentSuite.parentSuite) {
            fullName = parentSuite.description + '#CUSTOM_SEPARATOR#' + fullName;
        }
    }
    
    var fullNameArray = fullName.split('#CUSTOM_SEPARATOR#');
    fullName = '';
    for (var i = 0; i < fullNameArray.length; i++) {
        fullName += fullNameArray[i] + '\r' + Array(i + 2).join(' ');
    }
    
    return fullName;
};

Ext.application({
    name: 'TESTER',
    requires: [],
    launch: function(){
        Ext.Loader.setPath('FSS', '../app');
        var test = window.location.search.slice(6);
        
        //noinspection JSValidateTypes
        Ext.syncRequire([test ? test : '###TEST_CLASS###']);
        
        this.addAllTests(TEST);
        setTimeout(jasmine.getEnv().execute, 1000);
    },
    addAllTests: function(root){
        var current;
        for (var item in root) {
            if (root.hasOwnProperty(item)) {
                current = root[item];
                if (Ext.isObject(current)) {
                    if (!current.addTests) {
                        this.addAllTests(current);
                    }
                    else {
                        current.addTests();
                    }
                }
            }
        }
    }
});
