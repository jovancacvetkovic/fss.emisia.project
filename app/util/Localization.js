Ext.define('FSS.util.Localization', {
    alternateClassName: 'FSS.Locale',
    singleton: true,

    loadLocales: function (url) {
        Ext.Loader.loadScript({
                url: url,
                onLoad: this.onSuccess,
                onError: this.onFailure,
                scope: this
            }
        );
    },

    onSuccess: function () {
        window.location.reload();
    },

    onFailure: function () {
        Ext.Msg.alert('Failure', 'Failed to load locale file.');
    }
});