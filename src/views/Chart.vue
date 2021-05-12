<template>
  <div class="d-flex flex-row">
    <div class="">
      <Sidebar />
    </div>
    <div class="home w-100 d-flex flex-column">
      <div class="w-100">
        <Search />
      </div>
      <div class="row w-100 mx-auto">
          <div
          :key="this.chart.title"
          class="col-12 col-xl-6"
        >
          <router-link :to="{ path:'/chart', query: { chartid: chart.title } }"><LineChart :data="chart" /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

// @ is an alias to /src
<script lang="ts">
import {db} from '../firebase';
import Search from "../components/Search.vue";
import Sidebar from "../components/Sidebar.vue";
import HelloWorld from "../components/HelloWorld.vue";
import LineChart from "../components/LineChart.vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import computed from "vue";
export default defineComponent({
  props: ['chartid'],
  components: {
    Search,
    Sidebar,
    LineChart,
  },
  data: function() {
      return {
        chart: {}
      }
  },
  mounted: function() {
      db.collection("mutationsCollection").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {         
          if(doc.id === this.chartid) {
              this.chart = doc;
          }
          alert();
        });
      });
  }
});
</script>

<style lang="scss">
.home {
  margin-left: 250px;
}
</style>