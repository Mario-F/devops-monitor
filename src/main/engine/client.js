import os from 'os'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import reactive from 'feathers-reactive'
import io from 'socket.io-client'

import { UpdateDisplays } from './client/update_displays'
import monitor from './monitor'

let displaysService = null
let playlistsService = null

function start(options) {
  const opt = {}
  Object.assign(opt, {
    serverUrl: 'http://localhost:3030',
    myName: os.hostname(),
  }, options)

  const socket = io(opt.serverUrl)
  const client = feathers()
    .configure(socketio(socket))
    .configure(reactive({ idField: '_id' }))

  displaysService = client.service('displays')
  playlistsService = client.service('playlists')

  UpdateDisplays().then(monitor).catch(console.error)
  setInterval(UpdateDisplays, 10000)
}

export default {
  start,
}

export {
  displaysService,
  playlistsService,
}
