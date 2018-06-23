/**
 * FSS Auth Protect
 * Protect any method being called if user is not logged in
 */
Ext.define('FSS.mixin.AuthProtect', {
    extend: 'Ext.Mixin',

    onClassMixedIn: function (targetClass) {
        const proto = targetClass.prototype;
        const config = proto.config;

        // noinspection JSUnresolvedVariable
        const protectedMethods = config.protectedMethods || proto.protectedMethods;
        const checkAuth = this.prototype.checkAuth;

        if (protectedMethods) {
            Ext.Object.each(protectedMethods, function (key, value) {
                if (value && proto[ key ]) {
                    targetClass.addMember(key, function () {

                        // execute the checkAuth methods
                        // change this variable to change the method name
                        if (checkAuth.apply(this, arguments) !== false) {
                            return this.callParent(arguments);
                        }
                    });
                }
            });
        }
    },

    checkAuth: function () {
        // return false to stop calling
        // noinspection JSUnresolvedVariable
        return !!FSS.$user;
    }
});