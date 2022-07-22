import Vue from 'vue';
import Vuex from 'vuex';
import { getToken, setToken } from '@/utils';
import storage from '@/utils/storage'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // number: 0
    user:
      // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO')) || {}
      // storage.get('HEIMA_TOUTIAO') || {}
      getToken() || {},
    id: storage.get('ART_ID') || 8183
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
