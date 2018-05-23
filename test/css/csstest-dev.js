Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ext': '../../ext/src',
        'Ext.ux': '../../ext/packages/ux/classic/src',
        'Clinical': '../../classic/src'
    }
});

Ext.application({
    name: 'Clinical',

    extend: 'Clinical.Application',

    requires: [
        'Clinical.view.Viewport'
    ],

    appFolder: '../../classic/src',

    p_appViewport: 'Clinical.view.Viewport'

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'Clinical.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to Clinical.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});