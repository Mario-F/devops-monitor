import log from 'electron-log'
import * as types from '../../store/mutation-types'
import store from '../../store'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import reactive from 'feathers-reactive'
import createSocket from './socket'

export const setup = (connection) => {
  store.commit(types.CS_CONNECTION_STATUS, { connection, status: 'Connecting...' })

  const socket = createSocket({ connection: connection, address: connection.address })
  const client = feathers()
    .configure(socketio(socket))
    .configure(reactive({ idField: '_id' }))

  connection.disconnect = () => {
    log.verbose(`Closing connection with address "${connection.address}".`)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: `Disconnected` })
    socket.close()
  }
}

export default setup
