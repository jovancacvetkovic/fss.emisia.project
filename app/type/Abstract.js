/**
 * FSS abstract type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.Abstract', {
    
    /**
     * @property {String[]} optionalParams
     * Type optional params
     */
    optionalParams: [],
    
    constructor: function(cfg){
        this.callParent(arguments);
        
        if (Ext.ClassManager.getClass(this).addMembers === Ext.Base.addMembers) {
            throw 'Type ' + Ext.ClassManager.getName(this) + 'is not overriding static method addMembers!';
        }
        
        var invalidArr = ['requires', '$className', 'createdFn', 'postprocessors', 'optionalParams'];
        cfg = cfg || {};
        var cfgName;
        var errors = [];
        
        for (cfgName in cfg) {
            if (Ext.Array.contains(invalidArr, cfgName)) {
                errors.push('Invalid cfg for a type. "' + cfgName + '" is reserved!')
            }
            else
                if (!this.initialCfg.hasOwnProperty(cfgName)) {
                    errors.push('Property "' + cfgName + '" is not expected by a type');
                }
        }
        
        invalidArr = invalidArr.concat(this.optionalParams);
        
        for (cfgName in this.initialCfg) {
            if (!Ext.Array.contains(invalidArr, cfgName) && !cfg.hasOwnProperty(cfgName)) {
                errors.push('Required property "' + cfgName + '" not provided to a type');
            }
        }
        if (errors.length) {
            throw errors.join('\n\r');
        }
    }
});