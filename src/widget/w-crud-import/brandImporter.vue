<template>
    <div id="w-crud-import">
        <button class="btn btn-default btn-md" id="show-modal" @click="showModal = true">{{label}}</button>
        <modal v-if="showModal" @close="showModal = false"
               v-bind:noid="noid"
               v-bind:placeholder="placeholder"
               v-bind:modaltitle="modaltitle">
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
        props: ['label', 'noid', 'placeholder', 'popuptitle'],
        data: function () {
            return {
                showModal: false,
            }
        },
    }
</script>