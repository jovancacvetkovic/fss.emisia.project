Ext.define('FSS.util.Logger', {
    singleton: true,
    /**
     * Logs color-coded console message; intended for development only
     * to be used in betwee debug directives.
     * @param {String} text to log
     */
    
    warn: function(text){
        console.log('%cWARN: %s', 'color: #FF4500;', text);
    },
    
    error: function(text){
        console.log('%cERROR: %s', 'color: #FF0000; background: #D9E6EE; padding: 2px;', text);
    },
    
    info: function(text){
        console.log('%cINFO: %s', 'color: #000000', text);
    },
    
    group: function(text, messages, collapsed){
        console[collapsed ? 'groupCollapsed' : 'group']('%c%s', 'color: #000000; font-weight: bold;', text);
        
        if (messages && messages.length) {
            var index = 0;
            while (index < messages.length) {
                this.info(messages[index]);
                index++;
            }
            
            console.groupEnd();
        }
    },
    
    close: function(){
        console.groupEnd();
    },
    
    table: function(data, filter){
        console.table(data, filter);
    },
    
    startTimer: function(timerId){
        console.time(timerId || 'timer');
    },
    
    stopTimer: function(timerId){
        console.timeEnd(timerId || 'timer');
    }
    
}, function(){
    window.Logger = {
        warn: FSS.util.Logger.warn,
        info: FSS.util.Logger.info,
        error: FSS.util.Logger.error,
        
        group: FSS.util.Logger.group,
        close: FSS.util.Logger.close,
        table: FSS.util.Logger.table,
        
        startTimer: FSS.util.Logger.startTimer,
        stopTimer: FSS.util.Logger.stopTimer
    };
});