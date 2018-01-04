//создаёт основную инстанцию vue, передав в неё все компоненты

import Vue from 'vue'

//виджеты
import wCrudApp from './src/widget/w-crud-app'
import wEditForm from './src/widget/w-edit-form'
import wString from './src/widget/w-string'
import wCrudImport from './src/widget/w-crud-import/brandImporter.vue'
//event emitter
import mitt from 'mitt';
//datastore
import DojoDataSource from './src/dojo-data-source'

const components = [wEditForm, wString, wCrudImport, wCrudApp];

components.map(function (c) {
    Vue.component(c.name, c);
});

Vue.prototype.$bus = mitt();
Vue.prototype.$ds = function (url, options) {
    return new DojoDataSource(new RqlStore({target: url}), options);
};

module.exports = {
    app: function (config) {
        return new Vue(config);
    }
};
