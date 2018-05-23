Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ext': '../ext/src',
        'Ext.ux': '../ext/packages/ux/classic/src',
        'Ext.ux.ajax': '../ext/packages/ux/src/ajax',
        'TEST': 'unit'
    }
});


//PHANTOMJS RETURNS STATUS 0 FOR SUCESSFUL REQUESTS
Ext.define('TEST.AjaxOverride', {
    override: 'Ext.Ajax',
    parseStatus: function(status){
        var fakeOK = {
            success: true,
            isException: false
        };
        
        var response = status === 0 ? fakeOK : this.callParent(arguments);
        
        return response;
    },
    request: function(options){
        var url = options.url;
        if (Ext.isObject(url)) {
            options.url = url.url;
        }
        
        return this.callParent(arguments);
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
    
    fullNameArray = fullName.split('#CUSTOM_SEPARATOR#');
    fullName = '';
    for (var i = 0; i < fullNameArray.length; i++) {
        fullName += fullNameArray[i] + '\r' + Array(i + 2).join(' ');
    }
    
    return fullName;
};

Ext.application({
    name: 'FSS',
    //appFolder: '../classic/src',
    requires: [],
    launch: function(){
        // Ext.Loader.setPath('FW', '../classic');
        var test = window.location.search.slice(6);
        if (test) {
            Ext.syncRequire([test]);
        }
        else {
            Ext.syncRequire(['###TEST_CLASS###']);
        }
        
        this.addAllTests(TEST);
        
        //jasmine.getEnv().execute();
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
