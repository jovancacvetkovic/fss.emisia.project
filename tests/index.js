let onKarmaLoaded = window.__karma__.loaded;
let isReady = false;

window.__karma__.loaded = function(){
};

//noinspection JSUnresolvedVariable
function isExtReady(){
    if (typeof Ext !== 'undefined') {
        let body = Ext.getBody();
        if (body) {
            let pulseLogo = body.down('#pulse-logo');
            if (pulseLogo) {
                isReady = true;
            }
        }
    }
}

function runTests(){
    // Wait for Ext to get ready
    if (isReady) {
        window.__karma__.loaded = onKarmaLoaded;
        window.__karma__.loaded();
    }
    else {
        setTimeout(function(){
            // Re-try for Ext until is ready
            isExtReady();
            runTests();
        }, 50);
    }
}

runTests();