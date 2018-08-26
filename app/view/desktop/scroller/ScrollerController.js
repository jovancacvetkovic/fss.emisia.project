/**
 * View scroller controller. Used to control multiple views and scrolling
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.scroller.ScrollerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssScrollerController',
    
    requires: [
//        'Ext.util.KeyMap',
        'Ext.util.TaskRunner'
    ],
    
    config: {
        /**
         * @cfg {FSS.type.view.desktop.scroller.Cfg} asyncCfg
         * Scroll arguments, arg object that is passed to native scroll method scrollTo
         */
        asyncCfg: {},
        
        /**
         * @cfg {String} behavior
         * Scroller behavior, defaults to `smooth`.
         * Native browser scroll animation
         */
        behavior: 'smooth',
        
        /**
         * @cfg {String} clsModifier
         * Scrollable container css class modifier, it is used to create overflow style for the element
         */
        clsModifier: 'fssScrollModifier',
        
        /**
         * @cfg {Ext.dom.Element} scrollEl
         * Scroller height element, scroll height will be inherited from `scrollEl`
         */
        scrollEl: undefined,
        
        /**
         * @cfg {Number} scrollIntoViewBottomMargin
         * Used to set bottom margin after scroll into view is finished
         */
        scrollIntoViewBottomMargin: 20,
        
        /**
         * @cfg {Number} scrollTopMargin
         * Scroll margin will be added to total scroll height.
         * It is used if scroll container height is not same as synced container height.
         * Example: if container has header that is not included into scroll then header height will be used to update scroll height accordingly
         */
        scrollTopMargin: 90,
        
        /**
         * @cfg {Number} scrollBottomMargin
         * Scroll margin will be added to total scroll height.
         * It is used if scroll container height is not same as synced container height.
         * Example: if container has header that is not included into scroll then header height will be used to update scroll height accordingly
         */
        scrollBottomMargin: 40,
        
        /**
         * @cfg {Number} scrollDefaultStep
         * It can be used to reproduce lazy/slow scrolling
         * Number of pixels to scroll on wheel event.
         * Set to `0` to use browser default scroll step
         * Defaults to 100
         */
        scrollDefaultStep: 100,
        
        /**
         * @cfg {Number} scrollLazyStep
         * It can be used to reproduce lazy/slow scrolling
         * Number of pixels to scroll on wheel event.
         * Set to `0` to use browser default scroll step
         * Defaults to 50
         */
        scrollLazyStep: 50,
        
        /**
         * @cfg {Number} scrollStep
         * Number of pixels to scroll on wheel event.
         * Set to `0` to use browser default scroll step
         * Defaults to 100
         */
        scrollStep: 100,
        
        /**
         * @cfg {Ext.container.Container[]} syncList
         * List of all containers that are syncing their scrolls with scroller
         */
        syncList: []
    },
    
    listen: {
        global: {
            'e_scrollIntoView': 'scrollIntoView',
            'e_scrollToTop': 'scrollToTop',
            'e_spotlight': 'onSpotlight'
        }
    },
    
    /**
     * @private
     * @property {Boolean} animate
     * Sets animation scrolling effect if set to `true`
     */
    animate: false,
    
    /**
     * @private
     * @property {Number} allTaskerId
     * Scroll defer tasker id used to clear previous defer
     */
    allTaskerId: undefined,
    
    /**
     * @private
     * @property {Ext.component.Component} lastLayoutCmp
     * Last component that fired layout event that affects scroller
     */
    lastLayoutCmp: undefined,
    
    /**
     * @private
     * @property {Number} mouseWheelSpeed
     * Used to optimize scroll speed, e.g. FF is to slow on rendering frames
     * so here we will boost its scroll
     */
    mouseWheelSpeed: 20,
    
    /**
     * @private
     * @property {Boolean} registered
     * If scroller is initialized after layout, there might be more layout events
     * so we are marking scroller as registered after first layout to prevent multiple syncing
     */
    registered: false,
    
    /**
     * @private
     * @property {Ext.util.TaskRunner.Task} scrollTasker
     * Events task runner will be used to batch scroll event because there will be a lot
     * scroll events, so we'll try to save scroll for the last scroll event triggered
     */
    scrollTasker: undefined,
    
    /**
     * @private
     * @property {Number} scrollTime
     * Scroll time used to prevent inertial scrolling
     */
    scrollTime: undefined,
    
    /**
     * @private
     * @property {Number} scrollEndTime
     * Scroll end time used to prevent inertial scrolling
     */
    scrollEndTime: undefined,
    
    /**
     * @private
     * @property {Ext.util.TaskRunner.Task} tasker
     * Events task runner will be used to batch layout event because there will be a lot
     * layout events, so we'll try to save layout run for the last layout event triggered
     */
    tasker: undefined,
    
    control: {
        '#': {
            painted: 'setScrollWidth'
        }
    },
    
    init: function(){
        //noinspection JSUnresolvedFunction
        var taskRunner = new Ext.util.TaskRunner();
        
        //noinspection JSUnresolvedFunction
        this.tasker = taskRunner.newTask({
            interval: 100,
            run: this.setLayout.bind(this)
        });
        
        this.scrollTasker = taskRunner.newTask({
            interval: 100,
            run: this.scrollAllTo.bind(this)
        });

//        Ext.create('Ext.util.KeyMap', Ext.get(document), {
//            target: document,
//            scope: this,
//            binding: [{
//                key: 33,
//                handler: this.onPageMove
//            }, {
//                key: 34,
//                handler: this.onPageMove
//            }]
//        });
    },
    
    /**
     * Browser scrollTo wrapper
     * Changes scroll positions `top` and `left`
     * @param {Number} left Scroll left position
     * @param {Number} top Scroll top position
     * @param {Ext.container.Container} offsetEl OffsetEl element to scroll
     */
    doScroll: function(left, top, offsetEl){
        //noinspection JSUnresolvedFunction
        if (offsetEl) {
            //noinspection JSUnresolvedVariable
            var scroller = offsetEl.getScrollable ? offsetEl.getScrollable() : null;
            if (scroller) {
                scroller.scrollTo({
                    y: top
                }, this.animate);
            }
            else {
                //noinspection JSUnresolvedVariable
                var scrollDom = offsetEl.el ? offsetEl.el.dom : offsetEl;
                if (scrollDom.scrollTo) {
                    var cfg = {
                        left: 0
                    };
                    if (this.animate && !this.spotlightView) {
                        cfg.behavior = this.getBehavior();
                    }
                    if (Ext.isNumber(top)) {
                        cfg.top = top;
                    }
                    //noinspection JSCheckFunctionSignatures
                    scrollDom.scrollTo(cfg);
                }
                else {
                    //On IE and maybe some other browsers offsetEl.scrollTo method doesn't exist.
                    scrollDom.scrollTop = top;
                }
            }
        }
    },
    
    /**
     * Fixes after layout scroll errors
     * Why do we need this?
     *  - `lazy` img loading
     *  - multiple `after layouts` for some components
     *  - deferred `animations`
     */
    fixLayoutScroll: function(){
        var scrollTop;
        var view = this.getView();
        var syncList = this.getSyncList();
        
        var index = syncList.length;
        var container;
        var scrollable;
        var top;
        while (index) {
            index--;
            container = syncList[index];
            scrollable = container.getScrollable();
            if (scrollable) {
                
                // Get scrollTop with biggest error
                top = scrollable.getPosition().y;
                if (scrollTop !== undefined) {
                    scrollTop = scrollTop < top ? top : scrollTop;
                }
                else {
                    scrollTop = top;
                }
            }
        }
        
        var scroller = view.getScrollable();
        var scrollerTop = scroller.getPosition().y;
        if (scrollTop !== undefined && scrollerTop !== scrollTop) {
            // If synced components are not in sync with scroller after layout
            // Try to re-sync to scroller position
            this.onRealScroll(scroller, scrollerTop);
        }
    },
    
    /**
     * Returns `true` if viewport/body is masked
     * @return {Boolean}
     */
    isBodyMasked: function(){
//        var isMasked = Ext.getBody().isMasked(true);
//        if (!isMasked) {
//            var active = Ext.WindowManager.getActive();
//            isMasked = active && active.modal;
//        }
        
        return false; //isMasked;
    },
    
    /**
     * Returns `true` if element is visible and with page boundaries
     * @param {Ext.dom.Element} el
     * @param {Ext.event.Event} e
     * @return {Boolean}
     */
    isElementInView: function(el, e){
        var pageTop = this.getScrollTopMargin();
        var pageBottom = this.getView().getHeight();
        //noinspection JSCheckFunctionSignatures
        var elementTop = Ext.fly(el).getY() + pageTop;
        
        //noinspection JSCheckFunctionSignatures
        var elementHeight = Ext.fly(el).getHeight();
        var elementBottom = elementTop + elementHeight;
        
        //noinspection JSCheckFunctionSignatures
        var visible = Ext.fly(el).isVisible(true);
        
        var isInView = elementBottom < pageBottom;
        if (e) {
            var topDirection = e.browserEvent.deltaY < 0;
            //noinspection JSUnresolvedFunction
            isInView = topDirection ? (el.getTop() > pageTop) : isInView;
        }
        return true; //visible && isInView;
    },
    
    /**
     * Returns scrollable status of hovered element, mouse wheel event should be ignored if scrolling above other scrollable element
     * Element is scrollable if scrollHeight is not equal to clientHeight
     * @param {Ext.dom.Element} hoverEl
     * @returns {Boolean}
     */
    isHoverElScrollable: function(hoverEl){
        var isScrollable = false;
        if (hoverEl) {
            var scrollerCls = Ext.String.format('.{0}{1}', Ext.baseCSSPrefix, 'scroller');
            //noinspection JSUnresolvedVariable
            if (hoverEl.up) { //noinspection JSUnresolvedFunction
                var dom;
                var scroller = hoverEl.up(scrollerCls);
                if (scroller && !scroller.hasCls('fssScrollModifier')) {
                    dom = scroller.dom;
                    if (dom.nodeName !== 'BODY') { //element is scrollable if scrollHeight is not equal to clientHeight
                        isScrollable = dom && dom.scrollHeight !== dom.clientHeight && Ext.fly(dom).getStyle('overflow') !== 'hidden';
                    }
                }
                
                if (!isScrollable) {
                    // If cmp is within any floating cmp then will say hovering cmp is also scrollable and prevent scrolling
                    var floatingCls = Ext.String.format('.{0}{1},{2}{3}', Ext.baseCSSPrefix, 'window', Ext.baseCSSPrefix, 'layout');
                    scroller = hoverEl.up(floatingCls);
                    isScrollable = !!scroller;
                }
            }
        }
        return isScrollable;
    },
    
    /**
     * Checks if scroll is allowed
     *
     * @return {Boolean} true if allowed
     */
    isScrollAllowed: function(){
        var allowed = false;
        var isBodyMasked = this.isBodyMasked();
        var spotlightView = this.spotlightView;
        var spotlightViewHeight = 0;
        var bodyHeight = Ext.getBody().getHeight();
        var y;
        var x;
        if (spotlightView) {
            spotlightViewHeight = spotlightView.getHeight();
            y = spotlightView.getY() + spotlightViewHeight;
            x = spotlightView.getX() + spotlightViewHeight;
        }
        if (!isBodyMasked || (spotlightViewHeight > bodyHeight || y > bodyHeight || x > bodyHeight)) {
            allowed = true;
        }
        return true; //allowed;
    },
    
    /**
     * Return scroll step size in pixels.
     * If stepSize is not defined or is `0` then browser default step size will be used.
     * @param {Number} delta Defined step size or browser default step size
     * @returns {Number}
     */
    getDefaultDelta: function(delta){
        var step = this.getScrollStep();
        if (step && Ext.isNumber(step)) {
            delta = (delta < 0) ? (-1 * step) : step;
        }
        
        return delta;
    },
    
    /**
     * Match container heights and returns true if first container height is bigger then second container
     * @param {Ext.container.Container} container1
     * @param {Ext.container.Container} container2
     * @return {Boolean}
     */
    getMaxHeight: function(container1, container2){
        var height1 = this.getInnerHeight(container1);
        var height2 = 0;
        if (container2) {
            height2 = this.getInnerHeight(container2);
        }
        
        return height1 < height2;
    },
    
    /**
     * Returns container inner height
     * This height will be used to create scroll height
     * @param {Ext.container.Container} container
     * @return {Number}
     */
    getInnerHeight: function(container){
        var height = 0;
        if (container) {
            var containerEl = container.el;
            if (containerEl) {
                var firstEl = containerEl.first();
                if (firstEl) {
                    height = firstEl.first().getHeight();
                }
            }
        }
        return height;
    },
    
    /**
     * Returns scroll height
     * @return {Number}
     */
    getScrollHeight: function(){
        var syncList = this.getSyncList();
        
        //noinspection JSUnresolvedVariable
        var offsetEl = Ext.Array.max(syncList, this.getMaxHeight.bind(this));
        var height = 0;
        if (offsetEl) {
            height = this.getInnerHeight(offsetEl);
        }
        
        return height;
    },
    
    /**
     * Browser page wheel event. Scroll will listen for wheel event to adjust its scroll.
     * @param {Event} e Wheel scroll event
     */
    onMouseWheel: function(e){
        Ext.GlobalEvents.fireEvent('e_hideTooltip');
        var wheelDeltaY;
        var view = this.getView();
        var scroller = view.getScrollable();
        //noinspection JSUnresolvedVariable
        var evt = e.browserEvent;
        
        if (evt.deltaY !== null) {
            wheelDeltaY = evt.deltaY;
            if (evt.deltaMode === 1) {
                wheelDeltaY *= this.mouseWheelSpeed;
            }
        }
        else
            if (evt.wheelDelta !== null) {
                wheelDeltaY = evt.wheelDelta;
            }
            else
                if ((evt.detail !== null) || evt.detail === 0) {
                    wheelDeltaY = evt.detail * this.mouseWheelSpeed;
                }
        
        //noinspection JSSuspiciousNameCombination
        var deltaY = Math.round(wheelDeltaY);
        if (this.isScrollAllowed()) {
            var isHoveringScrollableEl = false;
            
            //noinspection JSUnresolvedFunction,JSCheckFunctionSignatures
            var hoverEl = Ext.fly(e.target);
            if (hoverEl) {
                isHoveringScrollableEl = this.isHoverElScrollable(hoverEl);
            }
            
            //noinspection JSCheckFunctionSignatures
            var isPrevented = this.preventScroll(e);
            
            if (!isHoveringScrollableEl && !isPrevented && scroller.getScrollElement().dom) {
                // MacOS is firing inertial scroll events and scroll shouldn't use animation
                // because there is enough frames produced via inertial scroll to create animation on its own
                this.animate = !Ext.isMac;
                
                this.scrollTime = new Date().getTime();
                if (!this.scrollEndTime) {
                    this.scrollEndTime = new Date().getTime();
                }
                
                // Try to prevent inertial scrolling, this is MacOS issue
                // inertial scrolling is triggering about 10 times more events than regular scrolling
                if ((this.scrollTime - this.scrollEndTime) > 4) {
                    scroller.scrollBy(0, deltaY);
                    
                    // Making sure scroll events are fired
                    scroller.onDomScroll();
                    
                    this.scrollEndTime = new Date().getTime();
                }
            }
        }
    },
    
    /**
     * Restart tasker on each layout call so only last layout is triggered by tasker
     * @param {Ext.container.Container} cmp Container that triggered layout
     */
    onLayout: function(cmp){
        this.lastLayoutCmp = cmp;
        this.tasker.restart();
    },
    
    /**
     * Page keys handler
     * @param {Number} key Only 33 & 34 (page up & page down) are allowed here
     * @param {Ext.event.Event} e
     */
    onPageMove: function(key, e){
        //noinspection JSUnresolvedVariable
        var deltaY = (key === 34) ? 1 : -1;
        deltaY = this.getDefaultDelta(deltaY);
        
        var view = this.getView();
        var scroller = view.getScrollable();
        //noinspection JSCheckFunctionSignatures
        var target = e.getTarget();
        var isTargetScrollable = false;
        if (target) {
            var isInput = target.nodeName === 'INPUT';
            isTargetScrollable = isInput || this.isHoverElScrollable(Ext.fly(target));
        }
        
        //noinspection JSUnresolvedFunction
        if (scroller.getScrollElement().dom && !isTargetScrollable) {
            this.animate = true;
            scroller.scrollBy(0, deltaY);
        }
    },
    
    /**
     * Scrolls all depending containers synchronously
     * @param {Ext.scroll.Scroller} scroller Scroller container
     * @param {Number} scrollTop Scroll top position
     */
    onRealScroll: function(scroller, scrollTop){
        var view = this.getView();
        view.fireEvent('e_scroll', scroller, scrollTop);
        this.scrollArgs = {
            y: scrollTop
        };
        this.scrollAllTo();
        this.animate = false;
    },
    
    /**
     * Scroller listener. Scroller will listen for scroll event and sync all scrolls
     * @param {Ext.scroll.Scroller} scroller Scroller container
     * @param {Number} scrollLeft Scroll left position
     * @param {Number} scrollTop Scroll top position
     */
    onScroll: function(scroller, scrollLeft, scrollTop){
        //noinspection JSUnresolvedVariable
        var isAnimating = scroller._translatable && scroller._translatable.isAnimating;
        if (!isAnimating) {
            this.onRealScroll(scroller, scrollTop);
        }
        else {
            this.animate = true;
            if (this.allTaskerId) {
                clearTimeout(this.allTaskerId);
            }
            
            //noinspection JSValidateTypes
            this.allTaskerId = Ext.defer(this.onRealScroll, 100, this, [scroller, scrollTop]);
        }
    },
    
    /**
     * On spotlight event listener
     *
     * @param {FSS.view.desktop.scroller.Scroller} view
     */
    onSpotlight: function(view){
        var scrollStep = this.getScrollDefaultStep();
        if (view) {
            scrollStep = this.getScrollLazyStep();
        }
        this.setScrollStep(scrollStep);
        this.spotlightView = view;
    },
    
    /**
     * Prevents native scroller wheel event 'cause we will be using browser page wheel event
     * This will prevent double scrolling if mouse is hovering scroller
     * @param {Ext.event.Event} e
     * @returns {Boolean}
     */
    preventNativeScroll: function(e){
        e.preventDefault();
        return false;
    },
    
    /**
     * Prevent scrolling
     * @param {Ext.event.Event} e
     * @return {Boolean}
     */
    preventScroll: function(e){
        var wheelEvent = Ext.Array.contains(['wheel', 'mousewheel'], e.type);
        var preventScroll = false;
        var spotlightView = this.spotlightView;
        
        if (wheelEvent && spotlightView) {
            preventScroll = this.isElementInView(spotlightView.getEl(), e);
        }
        return false; //preventScroll;
    },
    
    /**
     * Register all containers to sync its scrolls with scroller
     * @param {FSS.view.desktop.scroller.Scroller} config
     */
    register: function(config){
        if (!this.registered) {
            //noinspection JSUnresolvedVariable
            this.setScrollEl(config.scrollEl);
            
            //noinspection JSUnresolvedVariable
            if (Ext.isNumber(config.scrollTopMargin)) {
                this.setScrollTopMargin(config.scrollTopMargin);
            }
            
            //noinspection JSUnresolvedVariable
            this.setSyncList(config.syncList);
            
            this.registerScrollEvents();
            this.setLayout();
            
            this.registered = true;
        }
    },
    
    /**
     * Register scroll events.
     * Set wheel listeners and prevent scroller wheel event.
     * Set onScroll listener to sync all scrolls
     * Set layout listeners to update current scroll size after referenced container changes its layout.
     */
    registerScrollEvents: function(){
        var syncList = this.getSyncList();
        var index = syncList.length;
        var cmp;
        while (index) {
            index--;
            cmp = syncList[index];
            cmp.on({
                'destroy': this.destroy,
                'resize': this.onLayout,
                'afterlayout': this.onLayout,
                scope: this
            });
            
            if (cmp.el && cmp.el.first) {
                cmp = cmp.el.first();
                cmp.on({
                    'afterlayout': this.onLayout,
                    'resize': this.onLayout,
                    scope: this
                });
            }
        }
        
        Ext.getBody().on('wheel', this.onMouseWheel, this);
        
        var view = this.getView();
        var scroller = view.getScrollable();
        if (scroller) {
            scroller.on('scroll', this.onScroll, this);
            
            //noinspection JSUnresolvedFunction
            scroller.getScrollElement().on('wheel', this.preventNativeScroll, this);
        }
    },
    
    /**
     * Scroll element into view
     * @param {Ext.dom.Element} el Element to be scrolled into view
     * @param {Number} offset Offset to fix scroll top if needed
     */
    scrollIntoView: function(el, offset){
        var view = this.getView();
        var position = view.getPosition();
        var newPosition;
        var inputField;
        if (el) {
            var element;
            var scroller = view.getScrollable();
            //noinspection JSUnresolvedVariable
            if (el.getEl) {
                element = el.getEl();
                el = element.dom;
            }
            else {
                //noinspection JSCheckFunctionSignatures
                element = Ext.fly(el);
            }
            newPosition = scroller.getScrollIntoViewXY(el);
            
            // Only attempt to scroll if it's needed.
            //noinspection JSCheckFunctionSignatures
            if (newPosition.y !== position[2] && !this.isElementInView(el)) {
                inputField = element.down('textarea,input');
                if (inputField) {
                    // Delayed focus here so that animation can catch it and include-in calculation
                    if (inputField.focus) {
                        inputField.focus(200);
                    }
                }
                
                this.animate = true;
                scroller.scrollTo(0, newPosition.y + offset + this.getScrollIntoViewBottomMargin());
            }
        }
    },
    
    /**
     * Scrolls view down from current scroll position to the given offset
     *
     * @param {Number} deltaY
     */
    scrollBy: function(deltaY){
        this.getView().getScrollable().scrollBy(0, deltaY, true);
    },
    
    /**
     * Scroll all synced containers to specified positions
     * @param {Number} scrollLeft Scroll left position
     * @param {Number} scrollTop Scroll top position
     */
    scrollTo: function(scrollLeft, scrollTop){
        this.scrollArgs = {
            x: scrollLeft,
            y: scrollTop
        };
        this.scrollTasker.restart();
    },
    
    /**
     * Scroll all synced components
     */
    scrollAllTo: function(){
        var offsetEl;
        var syncList = this.getSyncList();
        var index = syncList.length;
        while (index && this.scrollArgs) {
            index--;
            offsetEl = syncList[index];
            this.doScroll(0, this.scrollArgs.y, offsetEl);
        }
        
        delete this.scrollArgs;
        this.scrollTasker.stop();
    },
    
    /**
     * Scroll to bottom
     * @param {Boolean} animate
     */
    scrollToBottom: function(animate){
        this.animate = animate;
        
        var view = this.getView();
        var scroller = view.getScrollable();
        //noinspection JSUnresolvedFunction
        if (scroller.getScrollElement().dom) {
            scroller.scrollTo(0, height);
        }
    },
    
    /**
     * Scroll to top
     */
    scrollToTop: function(animate){
        this.animate = animate;
        
        var view = this.getView();
        var scroller = view.getScrollable();
        //noinspection JSUnresolvedFunction
        if (scroller.getScrollElement().dom) {
            scroller.scrollTo(0, 0);
        }
    },
    
    /**
     * Set scroll layout based on referenced elements `offsetEl` and `scrollEl`
     * Scroll will update its height and offset height to match those referenced containers
     */
    setLayout: function(){
        var view = this.getView();
        this.syncLayouts();
        
        if (this.registered /*&& view.rendered*/) {
            var offsetHeight = this.getScrollHeight();
            var scrollHeight = this.getScrollEl().getHeight();
            view.setHeight(scrollHeight);
            
            var scroller = view.lookup('scroller');
            scroller.setHeight(offsetHeight + this.getScrollTopMargin() + this.getScrollBottomMargin());
            
            this.fixLayoutScroll();
            
            // Stop tasker after layout is finished
            this.tasker.stop();
        }
    },
    
    /**
     * Set scroll margin value
     * Margin is used to fix difference in heights between scroll el and synced container
     * Example if sync el has header that is not included in scroll then header height should be passed as margin
     * @param {Number} margin
     */
    setScrollTopMargin: function(margin){
        margin = margin ? margin : 0;
        
        //noinspection JSUnusedGlobalSymbols
        this._scrollTopMargin = margin;
    },
    
    /**
     * Set scroll margin value
     * Margin is used to fix difference in heights between scroll el and synced container
     * Example if sync el has header that is not included in scroll then header height should be passed as margin
     * @param {Number} margin
     */
    setScrollBottomMargin: function(margin){
        margin = margin ? margin : 0;
        
        //noinspection JSUnusedGlobalSymbols
        this._scrollBottomMargin = margin;
    },
    
    /**
     * Sets scrollbars width
     */
    setScrollWidth: function(){
        var width = Ext.getScrollbarSize(true);
        var isFF = Ext.isGecko;
        var isIE = Ext.isIE;
        var isEdge = Ext.isEdge;
        var isWindows = Ext.isWindows;
        var maxWidth = 14;
        if (isFF) {
            maxWidth = isWindows ? 18 : 16;
        }
        else
            if (isIE || isEdge) {
                maxWidth = 18;
            }
        
        width = width >= maxWidth ? width : maxWidth;
        this.getView().setWidth(width);
    },
    
    /**
     * Set sync list
     * Adds all containers that should use scroller
     * and sets cls modifier to make them scrollable
     * @param {Ext.container.Container[]} syncList
     */
    setSyncList: function(syncList){
        syncList = syncList ? syncList : [];
        
        //noinspection JSUnusedGlobalSymbols
        this._syncList = syncList;
        
        this.syncLayouts();

//        var index = syncList.length;
//        var container;
//        while (index) {
//            index--;
//            container = syncList[index];
//            var pagingComponents = container.query(':plugin(fssListPaging)');
//            if (pagingComponents) {
//                this.syncListPagingEvents(container, pagingComponents);
//            }
//        }
    },
    
    /**
     * Sync all components layout if any synced component is resized
     * or browser/viewport is resized
     */
    syncLayouts: function(){
        var syncList = this.getSyncList();
        var scrollEl = this.getScrollEl();
        if (scrollEl) {
            var scrollHeight = scrollEl.getHeight();
            scrollHeight -= this.getScrollTopMargin();
            
            var cls = this.getClsModifier();
            var index = syncList.length;
            var container;
            while (index) {
                index--;
                container = syncList[index];
                container.setHeight(scrollHeight);
                container.addCls(cls);
            }
        }
    },
    
    /**
     * Sync all sub-components that use fssListPaging plugin
     * @param {Ext.container.Container} container Component container
     * @param {Ext.Component[]} components
     */
    syncListPagingEvents: function(container, components){
        var listPlugin;
        var index = components.length;
        while (index) {
            index--;
            listPlugin = components[index].getPlugin('fssListPaging');
            
            //noinspection JSUnresolvedVariable
            if (listPlugin && listPlugin.registerLocalEventListeners) {
                //noinspection JSUnresolvedFunction
                listPlugin.registerLocalEventListeners();
            }
        }
    }
}, function(Cls){
    Cls.mocks = {
        syncListPagingEvents: {
            args: {
                0: 'Ext.container.Container',
                1: 'Ext.Component[]'
            }
        },
        syncLayouts: {},
        setSyncList: {
            args: {
                0: 'Ext.container.Container[]'
            }
        },
        setScrollWidth: {},
        setLayout: {},
        scrollToTop: {
            args: {
                0: 'boolean'
            }
        },
        scrollToBottom: {
            args: {
                0: 'boolean'
            }
        },
        scrollAllTo: {},
        scrollTo: {
            args: {
                0: 'number',
                1: 'number'
            }
        },
        scrollBy: {
            args: {
                0: 'number'
            }
        },
        scrollIntoView: {
            args: {
                0: 'Ext.dom.Element'
            },
            returns: 'number'
        },
        registerScrollEvents: {},
        register: {
            args: {
                0: 'FSS.view.desktop.scroller.Scroller'
            }
        },
        preventScroll: {
            args: {
                0: 'Ext.event.Event'
            },
            returns: 'boolean'
        },
        preventNativeScroll: {
            args: {
                0: 'Ext.event.Event'
            },
            returns: 'boolean'
        },
        onSpotlight: {
            args: {
                0: 'FSS.view.desktop.scroller.Scroller',
                1: 'number'
            }
        },
        onScroll: {
            args: {
                0: 'Ext.scroller.Scroller',
                1: 'number',
                2: 'number'
            }
        },
        onRealScroll: {
            args: {
                0: 'Ext.scroller.Scroller',
                1: 'number'
            }
        },
        onPageMove: {
            args: {
                0: 'number',
                1: 'Ext.event.Event'
            }
        },
        onLayout: {
            args: {
                0: 'Ext.container.Container'
            }
        },
        onMouseWheel: {
            args: {
                0: 'Event'
            }
        },
        getScrollHeight: {
            returns: 'number'
        },
        getInnerHeight: {
            args: {
                0: 'Ext.container.Container'
            },
            returns: 'number'
        },
        getMaxHeight: {
            args: {
                0: 'Ext.container.Container',
                1: 'Ext.container.Container'
            },
            returns: 'boolean'
        },
        isScrollAllowed: {
            returns: 'boolean'
        },
        isHoverElScrollable: {
            args: {
                0: 'Ext.dom.Element'
            },
            returns: 'boolean'
        },
        isElementInView: {
            args: {
                0: 'Ext.dom.Element',
                1: 'Ext.event.Event'
            },
            returns: 'boolean'
        },
        isBodyMasked: {
            returns: 'boolean'
        },
        fixLayoutScroll: {},
        doScroll: {
            args: {
                0: 'number',
                1: 'number',
                2: 'Ext.container.Container'
            }
        },
        getDefaultDelta: {
            args: {
                0: 'number'
            },
            returns: 'number'
        },
        setScrollTopMargin: {
            args: {
                0: 'number'
            }
        },
        setScrollBottomMargin: {
            args: {
                0: 'number'
            }
        }
    };
});