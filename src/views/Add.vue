<template>
    <div class="d-flex flex-row">
        <div class="">
            <Sidebar />
        </div>
        <div class="home w-100 d-flex flex-column">
            <div class="w-100">
                <Search />
            </div>
            <div class="mx-auto">
                <div class="d-flex flex-row mx-auto">
                    Please fill in the form or click the import
                    <input class="mx-1" type="button" value="json" />button
                </div>
                <form v-on:submit.prevent="onSubmit">
                    <div>
                        <label for="mutationName">Mutation Name</label>
                        <input type="text" v-model="mutationName" name="mutationName" />
                    </div>
                    <div>
                        <label for="graphTitle">Graph Title</label>
                        <input type="text" v-model="graphTitle" name="graphTitle" />
                    </div>
                    <div>
                        <label for="xaxisName">xaxis Title</label>
                        <input type="text" name="xaxisName" v-model="xaxisName" />
                        <label class="mr-1" for="xaxisValue">xaxis:</label>
                        <input type="text" name="xaxisValue" v-model="xaxisValue" />
                    </div>
                    <div>
                        <label for="yName">y axis name title</label>
                        <input type="text" name="yName" v-model="yName" />
                        <label class="mr-1" for="series">Amount of y axis</label>
                        <input type="number"
                               name="series"
                               v-model="amountOfseries"
                               @change="(seriesNameArray = []), (seriesValueArray = [])" />
                        <p>
                            Enter the y entry's to the length same length as the xaxis, type
                            null for values which are empty.
                        </p>
                        <div v-for="(n, index) in parseInt(amountOfseries)" :key="index">
                            <label for="seriesName">Entry {{ n }}s Name:</label>
                            <input type="text"
                                   name="seriesName"
                                   v-model="seriesNameArray[n - 1]" />
                            <label for="seriesValue">Entry {{ n }}s Value:</label>
                            <input type="text"
                                   name="seriesValue"
                                   v-model="seriesValueArray[n - 1]" />
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="submit" @click="jsonForm" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Sidebar from "@/components/Sidebar.vue";
    import Search from "@/components/Search.vue";
    import { ref, computed, defineComponent } from "vue";

    interface JsonEntry {
        mutationName: string;
        graphTitle: string;
        xaxisValue: string;
        xaxisName: string;
        yName: string;
        yValues: string;
        amountOfseries: number;
        seriesNameArray: Array<string>;
        seriesValueArray: Array<string>;
        data: Array<object>;
    }

    export default defineComponent({
        data(): JsonEntry {
            return {
                mutationName: "mutationName",
                graphTitle: "graphTitle",
                xaxisValue: "1,2,3,4,5",
                xaxisName: "xaxisName",
                yName: "yName",
                yValues: "1,2,3,4,5",
                amountOfseries: 1,
                seriesNameArray: [],
                seriesValueArray: [],
                data: [],
            };
        },
        methods: {
            jsonForm() {
                const series: Array<object> = [];
                const title: Array<object> = [];
                const xaxis: Array<object> = [];
                const yaxis: Array<object> = [];
                this.data = [
                    { series: series, title: title, xaxis: xaxis, yaxis: yaxis },
                ];
                const strXvals = this.convertStringToList(this.xaxisValue);
                const xVals = strXvals.map((n) => Number(n));
                let error = false;
                console.log(this.data[0]);
                if (
                    this.xaxisValue.length == 0 ||
                    this.seriesValueArray.length == 0 ||
                    this.checkTitles()
                )
                    error = true;
                console.log(error);

                if (error || this.checkXvsYs(series, error, xVals)) {
                    console.log("failed");
                } else {
                    this.createJson(title, xaxis, yaxis, xVals);
                    this.$store.dispatch("insertUserData", {
                        mutationName: this.mutationName,
                        data: this.data[0],
                    });
                    console.log("pass");
                }
            },
            convertStringToList(val: string) {
                const str: string = val;
                const tempArray = str.split(",");
                return tempArray;
            },
            checkTitles() {
                if (this.mutationName == undefined) {
                    console.log(1);
                    return true;
                }
                if (this.graphTitle == undefined) {
                    console.log(2);
                    return true;
                }
                if (this.xaxisName == undefined) {
                    console.log(3);
                    return true;
                }
                if (this.yName == undefined) {
                    console.log(4);
                    return true;
                }
                return false;
            },
            checkXvsYs(series: Array<object>, error: boolean, xvals: Array<number>) {
                const xlen = xvals.length;
                const strValues: Array<string> = this.convertStringToList(
                    this.seriesValueArray[0]
                );
                const values: Array<number> = strValues.map((n) => Number(n));
                for (const i in this.seriesValueArray) {
                    const name: string = this.seriesNameArray[i];
                    if (name != undefined && values.length == xlen && !error) {
                        const tempObj: object = { name: name, data: values };
                        series[i] = tempObj;
                    } else {
                        return true;
                    }
                }

                return false;
            },
            createJson(
                title: Array<object>,
                xaxis: Array<object>,
                yaxis: Array<object>,
                xvals: Array<number>
            ) {
                const graphTitle: object = { text: this.graphTitle };
                const xaxisData: object = {
                    categories: xvals,
                    title: [{ text: this.xaxisName }],
                };

                const yaxisData: object = { title: [{ text: this.yName }] };
                title.push(graphTitle);
                xaxis.push(xaxisData);
                yaxis.push(yaxisData);
            },
        },
        components: {
            Search,
            Sidebar,
        },
    });
</script>


<style>
</style>
