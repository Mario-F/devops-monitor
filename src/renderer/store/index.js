import Vue from 'vue'
import Vuex from 'vuex'

// Global store
import state from './state'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

// Modules
//import example from './modules/example'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  //modules: {
  //  example,
  //},
  strict: debug,
})
