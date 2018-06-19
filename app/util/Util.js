Ext.define('FSS.util.Util', {
    alternateClassName: 'FSS.Util',
    singleton: true,
    
    safeGet: function(root, param){
        var properties = param.split('.');
        var len = properties.length;
        var item;
        var rootProperty = properties[0];
        var objItem;
        var objIndex;
        var indexesOpened;
        var indexesClosed;
        root = root || window[rootProperty];
        if (root) {
            for (var i = 0; i < len; i++) {
                objItem = properties[i];
                indexesOpened = this.indexesOf(objItem, '[');
                indexesClosed = this.indexesOf(objItem, ']');
                if (indexesOpened.length > 0) {
                    objIndex = objItem.substring(0, indexesOpened[0]);
                    if (!Ext.isEmpty(objIndex)) {
                        root = root[objIndex];
                    }
                
                    item = 0;
                    while (Ext.isDefined(indexesOpened[item]) && root) {
                        root = root[objItem.substring(indexesOpened[item] + 1, indexesClosed[item])];
                        item++;
                    }
                }
                else {
                    root = root[objItem];
                }
                if (!root) {
                    break;
                }
            }
        }
        return root;
    },
    
    indexesOf: function(text, chars){
        var posPoints = [];
        var posPoint;
        var posPointCounter = 0;
        do {
            posPoint = text.indexOf(chars);
            if (posPoint !== -1) {
                posPoints.push(posPoint + chars.length * posPointCounter);
                text = text.replace(chars, '');
                posPointCounter++;
            }
        }
        while (posPoint !== -1);
        return posPoints;
    }
    
});