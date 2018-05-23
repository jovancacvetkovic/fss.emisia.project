var page = require("webpage").create();
var system = require("system");
var url = system.args[1];

page.open(url, function(status){
    if (status !== "success") {
        console.log("could not successfully open up page at: " + url);
        phantom.exit(1);
    }
    else{
        phantom.exit(0);
    }
});
