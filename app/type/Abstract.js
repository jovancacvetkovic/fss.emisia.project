/**
 * Abstract type
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.Abstract', {

    /**
     * @property {String[]} optionalParams
     * Type optional params
     */
    optionalParams: [],

    constructor: function (cfg) {
        this.callParent(arguments);
        cfg = cfg || {};

        Ext.apply(this, cfg);
        this.validateParams(cfg);
    },

    validateParams: function (cfg) {
        if (Ext.ClassManager.getClass(this).addMembers === Ext.Base.addMembers) {
            throw 'Type ' + Ext.ClassManager.getName(this) + 'is not overriding static method addMembers!';
        }

        var invalidMembers = ['requires', '$className', 'createdFn', 'postprocessors', 'optionalParams'];
        var errors = [];

        var initialCfg = this.initialCfg;
        for (var cfgName in cfg) {
            if (cfg.hasOwnProperty(cfgName)) {
                if (Ext.Array.contains(invalidMembers, cfgName)) {
                    errors.push('Invalid cfg for a type. "' + cfgName + '" is reserved!')
                }
                else if (!initialCfg.hasOwnProperty(cfgName)) {
                    errors.push('Property "' + cfgName + '" is not expected by a type ' + Ext.ClassManager.getName(this));
                }
            }
        }

        invalidMembers = invalidMembers.concat(this.optionalParams);

        for (var initCfgName in initialCfg) {
            if (initialCfg.hasOwnProperty(initCfgName)) {
                if (!Ext.Array.contains(invalidMembers, initCfgName) && !cfg.hasOwnProperty(initCfgName)) {
                    errors.push('Required property "' + initCfgName + '" not provided to a type ' + Ext.ClassManager.getName(this));
                }
            }
        }

        if (errors.length) {
            throw errors.join('\n');
        }
    }
});