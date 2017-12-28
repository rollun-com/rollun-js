<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            <h3>Добавление брэндов</h3>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <textarea id="editor" v-model="input" placeholder="Введите брэнды сюда"></textarea>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">

                            <button class="modal-default-button" @click="$emit('close')">
                                Cancel
                            </button>
                            <button class="modal-default-button" @click="addBrands(input)">
                                Save
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import mitt from 'mitt';
    export default {
        name: 'modal',
        data: function () {
            return {
                input: '',
                buttonLabel: 'Add Brands'
            };

        },
        methods: {
            addBrands: function (value) {
                this._writeItems(value);
                this.$emit('close');
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
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        max-height: 80%;
        margin: 5px auto;
        padding: 20px 20px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {

    }

    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    #editor {
        width: 100%;
        height: 500px;
        max-width: 100%;
        max-height: 100%;
        border: 1px solid lightgrey;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
    }

    code {
        color: #f66;
    }
</style>