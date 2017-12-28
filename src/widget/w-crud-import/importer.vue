<template>
    <div id="w-crud-import">
        <button id="show-modal" @click="showModal = true">Add brands</button>
        <modal v-if="showModal" @close="showModal = false">

        </modal>
    </div>
</template>

<script>
import widget from '../../widget'
import modal from './modal.vue'

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
</script>