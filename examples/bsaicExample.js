//создаёт основную инстанцию vue, передав в неё все компоненты

import Vue from 'vue'

//виджеты
import wCrudApp from '../src/widget/w-crud-app'
import wAdvCrudApp from '../src/widget/w-adv-crud-app/AdvCrudApp.js'
import wEditForm from '../src/widget/w-edit-form'
import wString from '../src/widget/w-string'
import wNumber from '../src/widget/w-number'
import wDate from '../src/widget/w-date'
import wText from '../src/widget/w-text'
import wCheckBox from '../src/widget/w-checkbox'
import wCrudImport from '../src/widget/w-crud-import/brandImporter.vue'
//event emitter
import mitt from 'mitt';
//datastore
import DojoDataSource from '../src/dojo-data-source'

const components = [wCrudApp, wAdvCrudApp, wEditForm, wString, wNumber, wDate, wText, wCheckBox, wCrudImport];

components.map(function (c) {
    Vue.component(c.name, c);
});

/*var exampleStore = new Memory({
    data: [
        {
            id: 1,
            text: 'hello World',
            number: '88005553535'
        },
        {
            id: 2,
            text: 'wassup',
            number: '12331233'
        }
    ]
});*/
Vue.prototype.$bus = mitt();
Vue.prototype.$ds = function (url, options) {
    return new DojoDataSource(new RqlStore({target: url}), options);};

module.exports = {
    app: function (config) {
        return new Vue(config);
    }
};