'use strict'
import '../assets/css/photon.css'

import Vue from 'vue'
import moment from 'vue-moment'
import App from './App.vue'
import router from './router'
import store from './store'

// Load connections - move to separate file
import log from 'electron-log'
import storage from 'electron-json-storage'
storage.keys('connections', (err, keys) => {
  if(err) throw new Error('Unable to load stored keys.')

  storage.getMany(keys.reduce((a, k) => {
    if(/connection:/.test(k))
      a.push(k)
    return a
  }, []), (err, cons) => {
    if(err) throw new Error('Unable to load stored connections.')
    for(let cKey in cons) {
      store.dispatch('addConnection', cons[cKey])
    }
  })
})
// Load connections - move to separate file

const app = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})

// Bind vue moment to Vue
Vue.use(moment)
