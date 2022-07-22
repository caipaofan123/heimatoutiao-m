import Vue from 'vue';
import Vuex from 'vuex';
import { getToken, setToken } from '@/utils';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // number: 0
    user:
      // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO')) || {}
      // storage.get('HEIMA_TOUTIAO') || {}
      getToken() || {},
    id: 7909
  },
  getters: {},
  mutations: {
    // setNumber(state, payload) {
    //   console.log(payload);
    //   state.number++;
    // }
    setUser(state, payload) {
      state.user = payload;
      // localStorage.setItem('HEIMA_TOUTIAO', JSON.stringify(state.user));
      // storage.set('HEIMA_TOUTIAO', payload);
      setToken(payload);
    }
  },
  actions: {},
  modules: {}
});
