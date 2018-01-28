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

  const subDisplays = client.service('displays').watch().find().subscribe((result) => {
    log.verbose(`Connection "${connection.address}" receiving new display result.`)
    store.commit(types.CONNECTION_SET_DISPLAYS, { connection, displays: result })
  })

  connection.disconnect = () => {
    log.verbose(`Closing connection with address "${connection.address}".`)
    store.commit(types.CS_CONNECTION_STATUS, { connection, status: `Disconnected` })

    // End Subscriptions
    subDisplays.unsubscribe()

    // Close Socket connection
    socket.close()
  }
}

export default setup
