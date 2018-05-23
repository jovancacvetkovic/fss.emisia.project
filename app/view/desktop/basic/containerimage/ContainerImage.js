/**
 * Created by emisia on 5/22/18.
 */
Ext.define('FSS.view.desktop.basic.containerimage.ContainerImage', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.basic.containerimage.ContainerImageModel',
		'FSS.view.desktop.basic.containerimage.ContainerImageController'
    ],

    xtype: 'fssContainerImage',

    viewModel: {
        type: 'fssContainerImageModel'
    },

    controller: 'fssContainerImageController',
    
    config: {
        /**
         * @cfg {String} src The source of this image. See {@link Ext#resolveResource} for
         * details on locating application resources.
         * @accessor
         */
        src: null,
        
        /**
         * @cfg {String} imageCls The CSS class to be used when {@link #mode} is not set to 'background'
         * @accessor
         */
        imageCls : 'fss-img-image',
        
        /**
         * @cfg {String} backgroundCls The CSS class to be used when {@link #mode} is set to 'background'
         * @accessor
         */
        backgroundCls : 'fss-img-background',
        
        /**
         * @cfg {String} mode If set to 'background', uses a background-image CSS property instead of an
         * `<img>` tag to display the image.
         */
        mode: 'background'
    },
    
    baseCls: 'fss-container-img',
    
    beforeInitialize: function() {
        let me = this;
        me.onLoad = me.onLoad.bind(me);
        me.onError = me.onError.bind(me);
    },
    
    initialize: function() {
        let me = this;
        me.callParent();
        
        me.relayEvents(me.renderElement, '*');
        
        me.element.on({
            tap: 'onTap',
            scope: me
        });
    },
    
    hide: function() {
        let me = this;
        
        me.callParent(arguments);
        me.hiddenSrc = me.hiddenSrc || me.getSrc();
        if (!me.isDestroying) {
            me.setSrc(null);
        }
    },
    
    afterShow: function() {
        this.callParent(arguments);
        if (this.hiddenSrc) {
            this.setSrc(this.hiddenSrc);
            delete this.hiddenSrc;
        }
    },
    
    updateMode: function(mode) {
        let me            = this,
            imageCls      = me.getImageCls(),
            backgroundCls = me.getBackgroundCls();
        
        if (mode === 'background') {
            if (me.imageElement) {
                me.imageElement.destroy();
                delete me.imageElement;
                me.updateSrc(me.getSrc());
            }
            
            me.replaceCls(imageCls, backgroundCls);
        } else {
            me.imageElement = me.element.createChild({ tag: 'img' });
            
            me.replaceCls(backgroundCls, imageCls);
        }
    },
    
    updateImageCls : function (newCls, oldCls) {
        this.replaceCls(oldCls, newCls);
    },
    
    updateBackgroundCls : function (newCls, oldCls) {
        this.replaceCls(oldCls, newCls);
    },
    
    onTap: function(e) {
        this.fireEvent('tap', this, e);
    },
    
    applySrc: function (src) {
        return src && Ext.resolveResource(src);
    },
    
    /**
     * @private
     */
    updateSrc: function(newSrc) {
        let me = this,
            dom;
        
        if (me.getMode() === 'background') {
            dom = this.imageObject || new Image();
        }
        else {
            dom = me.imageElement.dom;
        }
        
        this.imageObject = dom;
        
        dom.setAttribute('src', Ext.isString(newSrc) ? newSrc : '');
        dom.addEventListener('load', me.onLoad, false);
        dom.addEventListener('error', me.onError, false);
    },
    
    detachListeners: function() {
        let dom = this.imageObject;
        
        if (dom) {
            dom.removeEventListener('load', this.onLoad, false);
            dom.removeEventListener('error', this.onError, false);
        }
    },
    
    onLoad : function(e) {
        this.detachListeners();
        
        if (this.getMode() === 'background') {
            this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
        }
        
        this.fireEvent('load', this, e);
    },
    
    onError : function(e) {
        this.detachListeners();
        
        // Attempt to set the src even though the error event fired.
        if (this.getMode() === 'background') {
            this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
        }
        
        this.fireEvent('error', this, e);
    },
    
    updateWidth: function(width) {
        let sizingElement = (this.getMode() === 'background') ? this.element : this.imageElement;
        
        sizingElement.setWidth(width);
        
        this.callParent(arguments);
    },
    
    updateHeight: function(height) {
        let sizingElement = (this.getMode() === 'background') ? this.element : this.imageElement;
        
        sizingElement.setHeight(height);
        
        this.callParent(arguments);
    },
    
    doDestroy: function() {
        let me = this;
        
        me.detachListeners();
        
        me.imageObject = me.imageElement = Ext.destroy(me.imageObject, me.imageElement);
        
        me.callParent();
    }
});