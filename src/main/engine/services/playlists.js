import { app } from 'electron'
import path from 'path'
import NeDB from 'nedb'
import service from 'feathers-nedb'

export default function() {
  const dbPlaylists = new NeDB({
    filename: path.join(app.getPath('userData'), '/db-data/playlists'),
    autoload: true
  })

  const playlistsService = service({
    name: 'playlists',
    Model: dbPlaylists,
  })

  playlistsService.docs = {

  }

  return playlistsService
}
