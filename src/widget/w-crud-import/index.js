import './index.css'
import widget from '../../widget'
import modal from './modal.js'

export default {
    name: 'w-crud-import',
    template: require('./index.html'),
    mixins: [widget],
    components: {'modal': modal},
    data: function () {
        return {
            showModal: false,
        }
    },
}
