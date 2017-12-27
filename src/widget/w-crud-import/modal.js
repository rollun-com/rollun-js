export default {
    name: 'modal',
    template: require('./modal.html'),
    data: function () {
        return {
            input: '',
            buttonLabel: 'Add Brands'
        };

    },
    methods: {
        addBrands: function (value) {
            this._writeItems(value);
            $emit('close');
        },
        _writeItems: function (value) {
            value = value.split("\n");
            value.forEach(function (item) {
                item = item.split("\t");
                let result = {};
                result["brand"] = item[0];
                result["category"] = item[1];
                app.$refs.crud.items.post(result);
            });
        },
    }
}