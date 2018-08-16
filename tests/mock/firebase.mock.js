// global application mocks

var firebase;
var FSS = FSS ? FSS : {};
FSS.firebase = firebase = {
    vapidKey: 'some_token_type_key',

    database: function () {
        return {
            ref: function () {
                return {
                    once: function () {
                        return {
                            then: function () {
                                return {
                                    val: function () {
                                        return [];
                                    }
                                };
                            }
                        };
                    }
                };
            }
        };
    },

    initializeApp: function () {
        
    },

    messaging: function () {
        return {
            usePublicVapidKey: function () {
                
            },

            onMessage: function(){},

            getToken: function(){
                return 'token';
            },

            requestPermission: function () {
                return {
                    then: function () {
                        return {
                            then: function () {
                                return {
                                    catch: function () {
                                        
                                    }
                                };
                            }
                        };
                    }
                }
            }
        }
    }
};