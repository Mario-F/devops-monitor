import * as types from './mutation-types'
import uuid from 'uuid/v4'
import storage from 'electron-json-storage'
import setupConnection from '../api/setupConnection'

export const addConnection = ({ commit }, connection) => {
  // If connection has no _id, create one an store connection in userdata
  if(!connection._id) {
    connection._id = uuid()
    storage.set('connection:'+connection._id, connection, (err) => {
      // TODO: Handle error
      if(err) throw err
    })
  }

  commit(types.CS_CONNECTION_ADD, connection)
  commit(types.CS_CONNECTION_BUSY, { connection, busy: true })
  commit(types.CS_CONNECTION_STATUS, { connection, status: 'Disconnected' })

  // Setupconnection for this new connection
  setupConnection(connection)

  // DUMMY
  setTimeout(() => {
    commit(types.CS_CONNECTION_BUSY, { connection, busy: false })
  }, 2000)
}

export const updConnection = ({ commit }, connection) => {

}

export const delConnection = ({ commit }, connection) => {
  if(connection.disconnect) connection.disconnect()

  commit(types.CS_CONNECTION_BUSY, { connection, busy: true })
  commit(types.CS_CONNECTION_STATUS, { connection, status: 'Deleting' })

  // Delete from storage
  storage.remove('connection:'+connection._id, (err) => {
    // TODO: Handle error
    if(err) throw err

    commit(types.CS_CONNECTION_DEL, connection)
  })
}
