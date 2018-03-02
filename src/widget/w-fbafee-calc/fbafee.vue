<template>
    <div style="max-width: 400px">
        <h3>FBA fee calculator</h3>
        <h5>Enter the item`s dimensions, then press 'Calculate'</h5>
        <br>
        <div>
            <div class="form-label">Longest side, inches<br></div>
            <input v-model="longestSide" class="form-control form-input" name="longestSide">
            <div class="form-label">Median side, inches<br></div>
            <input v-model="medianSide" class="form-control form-input" name="medianSide">
            <div class="form-label">Shortest side, inches<br></div>
            <input v-model="shortestSide" class="form-control form-input" name="shortestSide">
            <div class="form-label">Weight, pounds<br></div>
            <input v-model="weight" class="form-control form-input" name="weight">
            <br>
            <button id='submitBtn' type="button" class="btn btn-md btn-primary" v-bind:class="{active: submitBtnActive}"
                    v-on:click="sendRequest">
                Calculate
            </button>
        </div>
        <div id="response">
            <br>
            <h4>Your item`s FBA Fee: </h4>
            <slot id="fee-display">{{fee}}</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "w-fbafee-calc",
        props: ['url'],
        data: function () {
            return {
                longestSide: 0,
                medianSide: 0,
                shortestSide: 0,
                weight: 0,
                fee: 0,
                submitBtnActive: true
            };
        },
        methods: {
            sendRequest: function () {
                this.submitBtnActive = false;
                var action = this.url + '?and(';
                action += 'eq(longestSide,' + this.longestSide + '),'
                    + 'eq(medianSide,' + this.medianSide + '),'
                    + 'eq(shortestSide,' + this.shortestSide + '),'
                    + 'eq(weight,' + this.weight + '),'
                    + ')';
                var request = new XMLHttpRequest();
                request.open("GET", action);
                request.setRequestHeader('Accept', 'application/json');
                request.addEventListener("load", this.loaded);
                request.send();
            },
            loaded: function () {
                var responseData = JSON.parse(this.response);
                this.fee = '$' + responseData[0].fbaFee;
                this.submitBtnActive = true;
            }
        },
    }
</script>

<style scoped>
.form-input {
    width: 20%
}
</style>