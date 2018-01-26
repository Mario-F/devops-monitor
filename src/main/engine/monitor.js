import log from 'electron-log'
import { app, BrowserWindow, BrowserView, screen } from 'electron';
import { playlistsService } from './client'
import { SpawnPlaylist } from './monitor/playlist'

export default function monitor() {
  log.verbose('Starting monitor client')
  const activePlaylists = [] // stores all playlists in use

  // Get and watch all playlists, if a new playlist appears this function needs to handle it.
  // WHen a playlist gets removed the underlaying function will handle this.
  playlistsService.watch().find().subscribe((allPlaylists) => {
    log.debug('Get update on playlists:', allPlaylists)

    // filter for playlists not active and spawn monitors for them
    allPlaylists.filter(pl => activePlaylists.indexOf(pl._id) === -1).forEach((pl) => {
      log.debug('Found playlist not active:', pl)
      activePlaylists.push(pl._id)
      SpawnPlaylist(pl._id)
    })
  })

}
