cordova.define('cordova/plugin_list', function(require, exports, module){
    module.exports = [
        {
            "id": "cordova-plugin-firebase.FirebasePlugin",
            "file": "plugins/cordova-plugin-firebase/www/firebase.js",
            "pluginId": "cordova-plugin-firebase",
            "clobbers": [
                "FirebasePlugin"
            ]
        },
        {
            "id": "cordova-plugin-android-permissions.Permissions",
            "file": "plugins/cordova-plugin-android-permissions/www/permissions.js",
            "pluginId": "cordova-plugin-android-permissions",
            "clobbers": [
                "cordova.plugins.permissions"
            ]
        }
    ];
    module.exports.metadata = {
        "cordova-plugin-firebase": "1.0.4",
        "cordova-plugin-whitelist": "1.3.3",
        "cordova-android-support-gradle-release": "1.4.4",
        "cordova-plugin-android-permissions": "1.0.0"
    };
});

//window.FirebasePlugin.initFirebase();