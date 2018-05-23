window.CSS = {
    cssTest: {
        nextPage: function(){
            var wins = window.CSS.allWindows;
            var haveWindows = !!wins.length;
            if (haveWindows) {
                window.CSS.showWindow(wins.pop());
            }

            return haveWindows;
        }
    },
    disableViewPortCreation: function(){
        if (window.Clinical && Clinical.Application) {
            if (!Clinical.fa) {
                Clinical.fa = {};
            }

            Clinical.Application.prototype.m_createViewPort = window.CSS.startCssTests;
        }
        else {
            setTimeout(window.CSS.disableViewPortCreation, 50);
        }
    },
    showWindow: function(current){
        var main = window.CSS.cssTestComponentContainer;
        main.removeChild(main.firstChild);

        current.m_ajaxRequest = Ext.emptyFn;
        Ext.Ajax.request = Ext.emptyFn;
        current.m_ajaxRequestGet = Ext.emptyFn;

        var win = Ext.create(current.winClass, current);

        if (Ext.isDefined(current.p_methodToCall)) {
            win[current.p_methodToCall]();
        }

        if (Ext.isDefined(current.p_wizardCardName)) {
            var panelNavigation = win.query("tePanelNavigation")[0];
            var activeCard = panelNavigation.getLayout().setActiveItem(win[current.p_wizardCardName]);
            if (Ext.isDefined(current.p_methodToCallOnCard)) {
                activeCard.p_data = current.p_cardData;
                activeCard[current.p_methodToCallOnCard]();
            }
            win.setHeight(current.height);
            win.setWidth(current.width);
        }

        win.show();

        var dateFields = win.query('datefield');
        var dateFieldsLength = dateFields.length;
        var i = 0;
        while (i < dateFieldsLength) {
            var date = new Date('5/5/2045');
            dateFields[i].setValue(date);
            i++;
        }

        var clonedWinDom = win.el.dom.cloneNode(true);
        clonedWinDom.style.top = '5px';
        clonedWinDom.style.left = '5px';

        var winHeight = win.getHeight();

        win.close();

        window.CSS.removeIds(clonedWinDom);
        var winContainer = Ext.create('Ext.Component', {
            renderTo: window.CSS.cssTestComponentContainer,
            height: winHeight + 10
        });
        winContainer.el.dom.appendChild(clonedWinDom);
    },
    removeIds: function(nodes){
        var node;
        var i = 0;
        while (node = nodes[i]) {
            node.id = '';
            if (node.childNodes.length) {
                window.CSS.removeIds(node.childNodes);
            }
            i++;
        }
    },
    startCssTests: function(){
        window.CSS.cssTestComponentContainer = window.document.getElementById('cssTestComponentContainer');
        var loadingDiv = window.document.getElementById('cssTestLoading');
        loadingDiv.parentNode.removeChild(loadingDiv);

        //Clinical.Msg test
        var msgTestComponent = Ext.create('Ext.Component', {
            renderTo: window.CSS.cssTestComponentContainer
        });

        var msgs = [{
            title: 'Error - details expanded',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt nunc ac lacinia mollis.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt nunc ac lacinia mollis.',
            expandDetails: true
        }, {
            type: 'info',
            title: 'Info - details collapsed',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt nunc ac lacinia mollis.',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt nunc ac lacinia mollis.'
        }, {
            type: 'warning',
            title: 'Warning - empty'
        }];

        var item = 0;
        var savedLeft = 5;
        var maxHeight = 0;
        var msg;
        while (msg = msgs[item]) {
            Clinical.Msg.m_show(msg);
            if (msg.expandDetails) {
                Clinical.Msg.p_details.expand();
            }
            var clonedMsg = Clinical.Msg.el.dom.cloneNode(true);
            Clinical.Msg.close();

            clonedMsg.style.top = '5px';
            clonedMsg.style.left = savedLeft + 'px';
            savedLeft += parseInt(clonedMsg.style.width) + 5;
            maxHeight = Math.max(maxHeight, parseInt(clonedMsg.style.height));

            window.CSS.removeIds(clonedMsg);

            msgTestComponent.el.dom.appendChild(clonedMsg);
            item++;
        }

        msgTestComponent.setHeight(maxHeight + 10);

        window.CSS.allWindows = [];
        window.CSS.allWindows.reverse();

        //Actions test
        /*var generateBtnActions = function(root){
         var actions = [];
         for (var action in root) {
         var current = root[action];
         if (Ext.isFunction(current)) {
         var className = current.getName();
         if (className) {
         var alias = Ext.ClassManager.getAliasesByName(className);
         if (alias && alias[0]) {
         var xtype = alias[0].split('widget.')[1];
         if (xtype) {
         var actionCfg = Clinical.action.Mixin.generateCfg({
         taskName: xtype
         });
         actions.push(actionCfg);
         }
         }
         }
         }
         if (Ext.isObject(current)) {
         actions = actions.concat(generateBtnActions(current))
         }
         }

         return actions;
         }

         Ext.create('Ext.Toolbar', {
         items: generateBtnActions(Clinical.action.button),
         renderTo: Ext.getBody(),
         width: 1900,
         layout: 'anchor',
         cls: 'mainActionBar',
         ui: 'footer'
         });*/
    }
};

window.CSS.disableViewPortCreation();
