import {createStore} from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import createPersistedState from "vuex-persistedstate"
import * as Cookies from 'js-cookie'
//const Cookies = require('js-cookie')

export const store = createStore({
  //plugins: [createPersistedState({
  //getState: (key) => Cookies.getJSON(key),
  //setState: (key, state) => Cookies.set(key, state, {expires: 3, secure: true})
  //})],
  plugins: [createPersistedState()],
  state: {
    searchID: null,
    clickedChart: {},
    defaultMutations: fb.defaultMutations
  },
  getters: {
    getSearchID: (state) => {
      return state.searchID;
    },
    getClickedChart: (state) => {
      return state.clickedChart;
    },
  },
  mutations: {
    setSearchID(state, val) {
      state.searchID = val;
    },
    setClickedChart(state, val) {
      state.clickedChart = val;
    },
  },
  actions: {
    async insertUserData({commit}, {mutationName, data}) {
      console.log(mutationName)
      fb.defaultCollection.doc().collection("agents").doc(mutationName).set(
         data
      ).then(() => {console.log("passed")}).catch(() =>console.log("failed"))
    },
  },
  modules: {},
});
