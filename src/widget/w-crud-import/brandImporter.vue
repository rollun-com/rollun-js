<template>
    <div id="w-crud-import">
        <button class="btn btn-default btn-md" id="show-modal" v-on:click="showPasteModal = true">{{label}}</button>
        <paste-modal v-if="showPasteModal" @close="showPasteModal = false"
                     v-bind:importfields="importfields"
                     v-bind:noid="noid"
                     v-bind:inputseparator="inputseparator"
                     v-bind:placeholder="placeholder"
                     v-bind:popuptitle="popuptitle"
                     v-bind:validatorname="validatorname"
                     v-bind:hasheaderline="hasheaderline">
        </paste-modal>
        <button class="btn btn-default btn-md" id="show-file2ds" v-if="activateFile2DsButton"
                v-on:click="showFile2DS = true">{{label+" (csv)"}}
        </button>
        <w-crud-file2ds v-if="showFile2DS" v-on:close="showFile2DS = false"></w-crud-file2ds>
    </div>
</template>

<script>
    import widget from '../../widget'
    import pasteModal from './modal.vue'
    import file2ds from '../w-crud-file2ds/file2ds.vue'

    export default {
        name: 'w-crud-import',
        mixins: [widget],
        components: {'paste-modal': pasteModal, 'w-crud-file2ds': file2ds},
        props: [
            'label',
            'importfields',
            'noid',
            'inputseparator',
            'placeholder',
            'popuptitle',
            'formname',
            'uploadurl',
            'uploadaccept',
            'uploadmultiple',
            'uploadheaders',
            'validatorname',
            'hasheaderline'
        ],
        created: function () {
            this.activateFile2DsButton = Boolean(this.uploadurl);
        },
        provide: function () {
            return {
                formName: this.formname,
                action: this.uploadurl,
                accept: this.uploadaccept,
                multiple: this.uploadmultiple,
                headers: this.uploadheaders
            }
        },
        data: function () {
            return {
                showPasteModal: false,
                showFile2DS: false,
                activateFile2DsButton: false
            }
        }
    }
</script>