/**
 * Route arguments type
 *
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.type.RouteArguments', {
    extend: 'FSS.type.Abstract',
    
    statics: {
        addMembers: function(data){
            this.prototype.initialCfg = data;
            this.callParent(arguments);
        }
    },
    
    /**
     * @property {String} 0
     * Push message title
     */
    0: undefined,

    /**
     * @property {String} 1
     *
     */
    1: undefined,

    /**
     * @property {String} 2
     *
     */
    2: undefined,

    /**
     * @property {String} 3
     *
     */
    3: undefined
});