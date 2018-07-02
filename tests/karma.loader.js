// create fake karma loader so test don't start before application is initialized
// real karma load is done within application.launch method
window.onKarmaLoaded = window.__karma__.loaded;
window.__karma__.loaded = function () {};