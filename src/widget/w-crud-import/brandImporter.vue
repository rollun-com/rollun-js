<template>
    <div id="w-crud-import">
        <button class="btn btn-default btn-md" id="show-modal" @click="showModal = true">{{label}}</button>
        <modal v-if="showModal" @close="showModal = false"
               v-bind:importfields="importfields"
               v-bind:noid="noid"
               v-bind:inputseparator="inputseparator"
               v-bind:placeholder="placeholder"
               v-bind:popuptitle="popuptitle">
        </modal>
    </div>
</template>

<script>
    import widget from '../../widget'
    import modal from './modal.vue'

    export default {
        name: 'w-crud-import',
        mixins: [widget],
        components: {'modal': modal},
        props: ['label', 'importfields', 'noid','inputseparator', 'placeholder', 'popuptitle'],
        data: function () {
            return {
                showModal: false,
            }
        },
    }
</script>