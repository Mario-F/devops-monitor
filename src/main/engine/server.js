import { app } from 'electron'
import path from 'path'
import NeDB from 'nedb'
import service from 'feathers-nedb'
import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import reactive from 'feathers-reactive'

const server = express(feathers())
server.configure(configuration())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.configure(express.rest())
server.configure(socketio())

server.on('connection', connection => server.channel('everybody').join(connection))
server.publish(() => server.channel('everybody'))

const dbDisplays = new NeDB({
  filename: path.join(app.getPath('userData'), '/db-data/displays'),
  autoload: true
})
server.use('/displays', service({
  name: 'displays',
  Model: dbDisplays,
}))

const dbPlaylists = new NeDB({
  filename: path.join(app.getPath('userData'), '/db-data/playlists'),
  autoload: true
})
server.use('/playlists', service({
  name: 'playlists',
  Model: dbPlaylists,
}))

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
