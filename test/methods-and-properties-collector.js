var TEST = TEST || {};
TEST.mapForUnitTests = {};
Ext.classSystemMonitor = function(className, info, origArgs){
    var supportedNameSpaces = ['FSS'];
    var omittedMethods = ['constructor', 'initComponent', 'init'];
    if (Ext.isString(className) && supportedNameSpaces.indexOf(className.split('.')[0]) !== -1 && !TEST.mapForUnitTests[className]) {
        TEST.mapForUnitTests[className] = true;
        var classCfg = origArgs[1];
        var cleanObj = {};
        for (var prop in classCfg) {
            if (classCfg.hasOwnProperty(prop) && (prop.slice(0, 2) === 'p_' || prop.slice(0, 3) === 'app' || (Ext.isFunction(classCfg[prop]) && omittedMethods.indexOf(prop) === -1))) {
                cleanObj[prop] = true;
            }
        }
        TEST.mapForUnitTests[className] = cleanObj;
    }
};
