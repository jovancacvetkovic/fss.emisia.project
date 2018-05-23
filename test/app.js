Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ext': '../ext/src',
        'Ext.ux': '../ext/packages/ux/classic/src',
        'Ext.ux.ajax': '../ext/packages/ux/src/ajax',
        'Common': '../packages/remote/Common/src',
        'Common.overrides': '../packages/remote/Common/overrides',
        'FW': '../classic/src',
        'FW.overrides': '../overrides',
        'TEST': 'unit',
        'TEST.Common': '../packages/remote/Common/test/unit/Common'
    }
});

Ext.require(['FW.overrides.Util', 'FW.overrides.NumberField', 'FW.overrides.String']);

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

//PREVENTING RELOADS
Ext.define('TEST.UF_Override', {
    override: 'Common.util.UF',
    m_windowLocationReload: function(){
        console.log('RELOAD PAGE REQUESTED');
    },
    m_windowLocationReplace: function(url){
        console.log('PAGE LOCATION CHANGED TO: ' + url);
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
    name: 'FootballWire',
    //appFolder: '../classic/src',
    requires: [],
    launch: function(){
        Ext.syncRequire(['Common.util.Util', 'TEST.Ajax', 'Common.FeatureAware', 'FW.Ziggeo']);
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
