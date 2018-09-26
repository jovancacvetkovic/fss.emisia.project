/**
 * Overrides data Field and adds localization into field
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.overrides.data.Field', {
    override: 'Ext.data.Field',
    
    /**
     * Returns locale object
     * @returns {Object} locale
     */
    getLocale: function(){
        var locale = this.config.locale;
        var isEmpty = Ext.isObject(locale) && !Ext.Object.getSize(locale);
        if (!locale || isEmpty) {
            locale = this.owner.$config.values.locale;
        }
        
        return locale;
    }
});