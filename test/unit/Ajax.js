/**
 * @author Nikola Jovicic
 */
Ext.define('TEST.Ajax', {
    extend: 'Ext.data.Connection',

    singleton: true,

    /**
     * @property {Boolean} autoAbort
     * Whether a new request should abort any pending requests.
     */
    autoAbort: false,

    method: 'POST',

    /**
     * Success method interceptor
     *
     * @param {Object} response The XMLHttpRequest object containing the response data.
     * @param {String} response.responseText The XMLHttpRequest response data.
     * @param {String} response.redirectUrl Url to redirect page to.
     * @param {Connection.type.AjaxOptions} options The parameter to the request call.
     */
    m_successInterceptor: function(response, options){
        // Some success methods expect non decoded response (localization, image blob...)
        if (options.p_successByStatus || (options.proxy && options.proxy.appSuccessByStatus)) {
            Ext.callback(options.m_originalSuccess, options.scope, [response, options]);
        }
        else {
            var responseObj = Ext.decode(response.responseText, true);
            Ext.callback(options.m_originalSuccess, options.scope, [responseObj, options]);
        }
    },
    request: function(options){
        options.jsonData = Ext.clone(options.params);
        delete options.params;

        options.m_originalSuccess = options.success;

        options.success = Ext.bind(this.m_successInterceptor, this);

        var request = this.callParent(arguments);

        return request;
    }
});