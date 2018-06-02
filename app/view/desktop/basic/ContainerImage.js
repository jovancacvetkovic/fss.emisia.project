/**
 * FSS Container image
 * This is a container which can set src property and get image as background image.
 * This will make layouts a lot easier to configure
 */
Ext.define('FSS.view.desktop.basic.ContainerImage', {
    extend: 'Ext.Container',
    
    xtype: 'fssContainerImage',
    
    config: {
        /**
         * @cfg {String} src
         * The source of this image. See {@link Ext#resolveResource} for
         * details on locating application resources.
         * @accessor
         */
        src: null,
        
        /**
         * @cfg {String} imageCls
         * The CSS class to be used when {@link #mode} is not set to 'background'
         * @accessor
         */
        imageCls: 'fss-img-image',
        
        /**
         * @cfg {String} backgroundCls
         * The CSS class to be used when {@link #mode} is set to 'background'
         * @accessor
         */
        backgroundCls: 'fss-img-background'
    },
    
    /**
     * @property {String} baseCls
     * Container base cls
     */
    baseCls: 'fss-container-img',
    
    items: [],
    
    /**
     * @inheritDoc
     */
    beforeInitialize: function(){
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
    },
    
    /**
     * @inheritDoc
     */
    initialize: function(){
        //noinspection JSAccessibilityCheck
        this.callParent();
    
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        this.relayEvents(this.renderElement, '*');
        
        //noinspection JSAccessibilityCheck
        this.element.on({
            tap: 'onTap',
            scope: this
        });
    },
    
    /**
     * @inheritDoc
     */
    hide: function(){
        //noinspection JSAccessibilityCheck
        this.callParent(arguments);
        
        //noinspection JSUnresolvedFunction
        this.hiddenSrc = this.hiddenSrc || this.getSrc();
        if (!this.isDestroying) {
            //noinspection JSUnresolvedFunction
            this.setSrc(null);
        }
    },
    
    /**
     * @inheritDoc
     */
    afterShow: function(){
        //noinspection JSAccessibilityCheck
        this.callParent(arguments);
        if (this.hiddenSrc) {
            //noinspection JSUnresolvedFunction
            this.setSrc(this.hiddenSrc);
            delete this.hiddenSrc;
        }
    },
    
    /**
     * @inheritDoc
     */
    updateMode: function(){
        //noinspection JSUnresolvedFunction
        let imageCls = this.getImageCls();
        
        //noinspection JSUnresolvedFunction
        let backgroundCls = this.getBackgroundCls();
        
        if (this.imageObject) {
            //noinspection JSUnresolvedFunction
            this.updateSrc(this.getSrc());
        }
        
        this.replaceCls(imageCls, backgroundCls);
    },
    
    /**
     * @inheritDoc
     */
    updateImageCls: function(newCls, oldCls){
        this.replaceCls(oldCls, newCls);
    },
    
    /**
     * @inheritDoc
     */
    updateBackgroundCls: function(newCls, oldCls){
        this.replaceCls(oldCls, newCls);
    },
    
    /**
     * @inheritDoc
     */
    onTap: function(e){
        //noinspection JSUnresolvedFunction
        this.fireEvent('tap', this, e);
    },
    
    /**
     * @inheritDoc
     */
    applySrc: function(src){
        return src && Ext.resolveResource(src);
    },
    
    /**
     * @private
     */
    updateSrc: function(newSrc){
        // Create image dom
        let dom = this.imageObject || new Image();
        this.imageObject = dom;
        
        dom.setAttribute('src', Ext.isString(newSrc) ? newSrc : '');
        //noinspection JSUnresolvedFunction
        dom.addEventListener('load', this.onLoad, false);
        //noinspection JSUnresolvedFunction
        dom.addEventListener('error', this.onError, false);
    },
    
    /**
     * Detach all container listeners
     */
    detachListeners: function(){
        let dom = this.imageObject;
        
        if (dom) {
            dom.removeEventListener('load', this.onLoad, false);
            dom.removeEventListener('error', this.onError, false);
        }
    },
    
    /**
     * On image load listener. Sets background image and fires load event
     * @param {Ext.event.Event} e
     */
    onLoad: function(e){
        this.detachListeners();
        
        //noinspection JSAccessibilityCheck
        this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
        
        //noinspection JSUnresolvedFunction
        this.fireEvent('load', this, e);
    },
    
    /**
     * On image load error listener.Sets background image and fires error event.
     * @param {Ext.event.Event} e
     */
    onError: function(e){
        this.detachListeners();
        
        // Attempt to set the src even though the error event fired.
        //noinspection JSAccessibilityCheck
        this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
        
        //noinspection JSUnresolvedFunction
        this.fireEvent('error', this, e);
    },
    
    /**
     * @inheritDoc
     */
    updateWidth: function(width){
        //noinspection JSAccessibilityCheck,JSUnresolvedFunction
        let sizingElement = this.element;
        sizingElement.setWidth(width);
        
        //noinspection JSAccessibilityCheck
        this.callParent(arguments);
    },
    
    /**
     * @inheritDoc
     */
    updateHeight: function(height){
        //noinspection JSAccessibilityCheck,JSUnresolvedFunction
        let sizingElement = this.element;
        sizingElement.setHeight(height);
        
        //noinspection JSAccessibilityCheck
        this.callParent(arguments);
    },
    
    /**
     * @inheritDoc
     */
    doDestroy: function(){
        this.detachListeners();
        
        this.imageObject = Ext.destroy(this.imageObject);
        
        //noinspection JSAccessibilityCheck
        this.callParent();
    }
});