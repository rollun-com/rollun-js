<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <h3>{{popuptitle}}</h3>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div v-if="alertFail"
                                 class="alert alert-danger" role="alert">
                                {{"Error: " + alertFail}}
                                <button v-on:click="alertFail = false" type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <textarea id="editor"
                                      v-model="input"
                                      v-bind:placeholder='placeholder'>
                            </textarea>
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button btn btn-default btn-md" @click="$emit('close')">
                                Отменить
                            </button>
                            <button class="modal-default-button btn btn-primary btn-md" @click="addBrands(input)">
                                Сохранить
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
        name: 'paste-modal',
        props: ['importfields', 'noid', 'inputseparator', 'placeholder', 'popuptitle', 'validatorname', 'hasheaderline'],
        data: function () {
            return {
                input: '',
                alertFail: false,
            };
        },
        methods: {
            addBrands: function (value) {
                var parsedValue = this._parseItemsToArray(value);
                try {
                    this._validate(parsedValue, this.validatorname);
                } catch (exception) {
                    if (typeof(exception) === 'string') {
                        this.alertFail = exception;
                        return;
                    } else {
                        this.alertFail = exception.message;
                        return;
                    }
                }
                this._writeToStore(parsedValue);
                this.$emit('close');
                app.$refs.crud.refresh();
            },

            _parseItemsToArray: function (value) {
                var self = this;
                var parsedValue = [];
                value = value.split("\n");
                var tableColumns = self._getTableColumns(self.noid, self.importfields);
                value.forEach(function (row) {
                    var items = row.split(self.inputseparator);
                    var result = {};
                    tableColumns.forEach(function (column, index) {
                        result[column] = (items[index] === undefined ? "" : items[index]);
                    });
                    parsedValue.push(result)
                });
                return parsedValue;
            },

            _getTableColumns: function (noid, importfields) {
                importfields = JSON.parse(importfields);
                if (!(importfields === null)) {
                    return importfields;
                }
                noid = JSON.parse(noid);
                var tableColumns = Object.keys(app.$refs.crud.items.schema());
                if (noid === true) {
                    tableColumns.shift()
                }
                return tableColumns;
            },

            _validate: function (value, validatorName) {
                if (window[validatorName]) {
                    var validatorFunction = window[validatorName];
                    if (typeof validatorFunction === 'function') {
                        var testValue = Object.assign({}, value);
                        validatorFunction(testValue);
                    } else throw new Error('Неправильный валидатор');
                }
            },

            _writeToStore: function (value) {
                var hasHeaderLine = JSON.parse(this.hasheaderline);
                if (hasHeaderLine) {
                    delete value[0];
                }
                value.forEach(function (item) {
                    app.$refs.crud.items.post(item);
                })
            }
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
        padding: 10px;
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

    .modal-footer {
        margin: 5px;
    }

    .modal-default-button {
        float: right;
        margin: 5px;
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