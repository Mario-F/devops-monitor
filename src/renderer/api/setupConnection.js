import log from 'electron-log'
import * as types from '../store/mutation-types'
import store from '../store'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import reactive from 'feathers-reactive'
import io from 'socket.io-client'

export const setupConnection = (connection) => {
  const socket = io(connection.address)
  const client = feathers()
    .configure(socketio(socket))
    .configure(reactive({ idField: '_id' }))

  store.commit(types.CS_CONNECTION_STATUS, { connection, status: 'Connecting...' })
  socket.on('connect', () => {
    log.verbose(`Connection with address "${connection.address}" is connected.`)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: 'Connected' })
    store.commit(types.CS_CONNECTION_ESTABLISHED, { connection, established: true })
  })

  socket.on('disconnect', () => {
    log.verbose(`Connection with address "${connection.address}" is disconnected.`)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: 'Connnecting...' })
    store.commit(types.CS_CONNECTION_ESTABLISHED, { connection, established: false })
  })

  socket.on('reconnect', (attempt) => {
    log.verbose(`Connection with address "${connection.address}" is attempt to reconnect, Number: ${attempt}.`)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: `Connnecting... ${attempt}` })
  })

  socket.on('connect_error', (error) => {
    log.verbose(`Connection with address "${connection.address}" is errored:`, error)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: `Failed to connect` })
  })

  connection.disconnect = () => {
    log.verbose(`Closing connection with address "${connection.address}".`)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: `Disconnected` })
    socket.close()
  }
}

export default setupConnection
