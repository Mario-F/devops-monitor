import { app } from 'electron'
import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import reactive from 'feathers-reactive'
import swagger from 'feathers-swagger'

import displaysService from './services/displays'
import playlistsService from './services/playlists'

const server = express(feathers())
server.configure(configuration())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.configure(express.rest())
server.configure(socketio())

// Swagger Documentation
server.configure(swagger({
  docsPath: '/docs',
  uiIndex: true,
}))

server.on('connection', connection => server.channel('everybody').join(connection))
server.publish(() => server.channel('everybody'))

// Services
server.use('/displays', displaysService())
server.use('/playlists', playlistsService())

// Error Handlers
server.use(express.notFound({ verbose: !!app.isDevelopment }))
server.use(express.errorHandler())

function start() {
  return new Promise((resolve, reject) => {
    server.listen(3030).on('listening', resolve)
  })
}

function stop() {

}

export default {
  start,
  stop,
}
