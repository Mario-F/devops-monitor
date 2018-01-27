import log from 'electron-log'
import * as types from '../../store/mutation-types'
import store from '../../store'
import io from 'socket.io-client'

export const create = ({ connection, address }) => {
  const socket = io(address)

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

  return socket
}

export default create
