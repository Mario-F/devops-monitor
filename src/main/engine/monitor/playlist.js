import log from 'electron-log'
import { app, BrowserWindow, BrowserView, screen } from 'electron';
import { playlistsService } from '../client'
import View from './view'

const SpawnPlaylist = (idPlaylist) => {
  log.verbose('Playlist spawned, id:', idPlaylist)

  let myView = null

  // Subscribe to my playlist
  const myPlSubscription = playlistsService.watch().get(idPlaylist).subscribe((myPl) => {
    log.debug('Update for playlist, id:', idPlaylist, 'New data:', myPl)

    // If playlist is null, terminate playlist
    if(myPl === null)
      return terminatePlaylist()

    // If nothing can handle the update till this point stop the view and let it recreate
    if(myView) {
      myView.stop()
      myView = null
    }

    // If show create and start view (enabled is a display id)
    if(myPl.show) {
      myView = new View(myPl.items || [])
      myView.start(myPl.show)
    }
  })

  // Terminate Playlist
  const terminatePlaylist = () => {
    log.verbose('Terminating playlist:', idPlaylist)
    myPlSubscription.unsubscribe()
    if(myView)
      myView.stop()

    myView = null

    // TODO: more steps for termnations
  }
}

export {
  SpawnPlaylist,
}
