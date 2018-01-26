import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.CS_CONNECTION_ADD] (state, connection) {
    state.connections.push(connection)
  },
  [types.CS_CONNECTION_DEL] (state, connection) {
    state.connections.splice(state.connections.indexOf(connection), 1)
  },
  [types.CS_CONNECTION_BUSY] (state, { connection, busy }) {
    Vue.set(connection, 'busy', busy)
  },
  [types.CS_CONNECTION_STATUS] (state, { connection, status }) {
    Vue.set(connection, 'status', status)
  },
  [types.CS_CONNECTION_ESTABLISHED] (state, { connection, established }) {
    Vue.set(connection, 'established', established)
  },
}
