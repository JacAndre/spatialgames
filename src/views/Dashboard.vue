<template>
    <div class="d-flex flex-row">
        <div class="">
            <Sidebar />
        </div>

        <div class="home w-100 d-flex flex-column">
            <div class="row w-100 mx-auto">
                <div class="col-12 col-xl-6">
                    <Search />
                </div>
                <div v-for="chart in defaultCharts"
                     :key="chart.title"
                     class="col-12 col-xl-6">
                    <LineChart :data="chart" />
                </div>
                <Create />
            </div>
        </div>
    </div>
</template>

// @ is an alias to /src
<script lang="ts">
    import Sidebar from "../components/Sidebar.vue";
    import Search from "../components/Search.vue";
    import Create from "../components/Create.vue";
    import HelloWorld from "../components/HelloWorld.vue";
    import LineChart from "../components/LineChart.vue";
    import { defineComponent } from "vue";
    import computed from "vue";
    export default defineComponent({
        components: {
            Sidebar,
            Search,
            LineChart,
            Create,
        },
        computed: {
            defaultCharts() {
                return this.$store.state.defaultMutations;
            },
        },
    });
</script>

<style lang="scss">
    .home {
        margin-left: 250px;
    }
</style>

