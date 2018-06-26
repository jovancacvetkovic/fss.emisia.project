Ext.define('FSS.overrides.bind.RootStub', {
    override: 'Ext.app.bind.RootStub',

    /**
     * @inheritDoc
     */
    getDataObject: function () {
        return this.getOriginData();
    },

    /**
     * @inheritDoc
     */
    getRawValue: function () {
        return this.getOriginData();
    },

    /**
     * @inheritDoc
     */
    getValue: function () {
        return this.getOriginData();
    },

    /**
     * Returns data or locale object
     * @returns {Object}
     */
    getOriginData: function () {
        var data = this.owner.data;
        if (this.scheduler.isLocale) {
            data = this.owner.locale;
        }

        return data;
    },

    setLocale: function (value, preventClimb) {
        //<debug>
        if (!value || value.constructor !== Object) {
            Ext.raise('Only an object can be set at the root');
        }
        //</debug>
        var me = this,
            children = me.children || (me.children = {}),
            owner = me.owner,
            locale = owner.locale,
            parentVM = owner.getParent(),
            stub, v, key, setSelf, created;

        for (key in value) {
            //<debug>
            if (key.indexOf('.') >= 0) {
                Ext.raise('Value names cannot contain dots');
            }
            //</debug>

            // Setting the value.
            // Ensure the Stub exists for the name, and set its value.
            v = value[key];
            if (v !== undefined) {
                stub = children[key];
                setSelf = preventClimb || !me.shouldClimb(key);
                if (!stub) {
                    stub = me.createRootChild(key, setSelf);
                    created = true;
                } else if (setSelf && stub.isLinkStub && !stub.getLinkFormulaStub()) {
                    stub = me.insertChild(key);
                }

                if (!created || !locale.hasOwnProperty(value)) {
                    owner.invalidateChildLinks(key);
                }
                stub.set(v, setSelf);
            }
            // Clearing the value. Delete the locale item
            // Invalidate the Stub if it exists.
            else if (locale.hasOwnProperty(key)) {
                delete locale[key];

                stub = children[key];
                if (stub) {
                    if (!stub.isLinkStub && parentVM) {
                        stub = me.createRootChild(key);
                    }
                    owner.invalidateChildLinks(key, true);
                    stub.invalidate(true);
                }
            }
        }
    }
});