import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {store} from "./store";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueApexCharts from "vue3-apexcharts";
import "./assets/scss/app.scss";

library.add(fas);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(VueApexCharts);
app.mount("#app");

library.add(fas);
