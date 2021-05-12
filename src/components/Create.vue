<template>
    <div>
        <v-col class="pr-4">
            <v-slider v-model="slider"
                      class="align-center"
                      :max="max"
                      :min="min"
                      hide-details>
                <template v-slot:append>
                    <v-text-field v-model="slider"
                                  class="mt-0 pt-0"
                                  hide-details
                                  single-line
                                  type="number"
                                  style="width: 60px"></v-text-field>
                </template>
            </v-slider>
        </v-col>
    </div>
</template>

<script>
    import { db } from '../firebase';
    export default {
        data: function () {
            return {
                value: 0,
                min: 0,
                max: 100,
                slider: 50,
            };
        },
        mounted: function () {
            this.findCharts();
        },
        methods: {
            updateTextInput(val) {
                console.log(val);
                this.value = val;
            },
        }
    };
</script>

<style scoped lang="scss">
    button {
        background: linear-gradient( to right, #a80a14c5 0%, #a80a14c5 100%, #fff 0%, #fff 100% );
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
        height: 38px;
    }

    #mainBody {
        font-family: "Roboto", sans-serif;
    }

    #blanket {
        position: fixed;
        padding: 0;
        margin: 0;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    #suggest {
        cursor: pointer;
    }

    #search-bar,
    #suggest {
        width: 90%;
        padding: 6px 12px;
        z-index: 10;
    }

    .form-control {
        border-color: #a80a14c5;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
    }

    .shadow-bottom {
        box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
        -webkit-box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
        -moz-box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
    }
</style>
