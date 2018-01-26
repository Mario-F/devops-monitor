import log from 'electron-log'
import { app, BrowserWindow, BrowserView, screen } from 'electron';

export default class View {
  constructor(itemList) {
    log.debug('New view is created, items:', itemList.length)
    this.itemList = itemList
    this.window = null
    this.myDisplay = null
    this.paused = false
  }

  start(idDisplay) {
    log.verbose('View is started, display:', idDisplay)

    // Get display by id
    this.myDisplay = screen.getAllDisplays().filter(d => d.id == idDisplay).reduce((ac, d) => ac = d, null)
    if(!this.myDisplay)
      return log.error('Cant find display with id:', idDisplay)

    // In development mode dont render fullscreen kiosk windows
    if (app.isDevelopment) {
      this.myDisplay.size.width = (this.myDisplay.size.width * 0.75)
      this.myDisplay.size.height = (this.myDisplay.size.height * 0.75)
      this.myDisplay.workArea.x += 50
      this.myDisplay.workArea.y += 50
    }

    const windowOptions = {
      width: this.myDisplay.size.width,
      height: this.myDisplay.size.height,
      x: this.myDisplay.workArea.x,
      y: this.myDisplay.workArea.y,
      frame: false,
      kiosk: app.isDevelopment ? false : true,
      webPreferences: {
        contextIsolation: true,
      }
    }

    log.debug('Attaching view to Display:', this.myDisplay)
    this.window = new BrowserWindow(windowOptions)

    this.window.on('closed', () => {
      this.window = null
    })

    if(this.itemList) {
      this.itemList.forEach(this.createItem.bind(this))
      this.itemList[0].view.prepareShow(0).then(this.scheduler.bind(this)).catch(log.error)
    }
  }

  stop() {
    log.verbose('View is stopped')

    // Clear item timers
    if(this.itemList)
      this.itemList.filter(i => !!i.view).forEach(i => i.view.clearTimers())
    if(this.window)
      this.window.close()
  }

  scheduler(actItem) {
    log.debug('Scheduler is called')
    if(this.paused)
      return

    if(this.itemList.length === 0)
      return

    const actIndex = this.itemList.indexOf(actItem)
    if(actIndex === -1)
      return log.error('Cant find next item in playlist')

    const nextIndex = actIndex + 1
    if(this.itemList[nextIndex]) {
      this.itemList[nextIndex].view.prepareShow(actItem.time).then(this.scheduler.bind(this)).catch(log.error)
    } else {
      this.itemList[0].view.prepareShow(actItem.time).then(this.scheduler.bind(this)).catch(log.error)
    }
  }

  createItem(item) {
    log.verbose('Create new item on view.')

    const timers = []
    let showCount = 0

    const view = new BrowserView({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      }
    })

    // Kill popups
    view.webContents.on('new-window', function(e, url) {
      logData("stop popup", e)
      logData("stop popup", url)
      e.preventDefault();
    });

    view.webContents.loadURL(item.url)

    const prepareShow = (showtime) => {
      return new Promise((resolve, reject) => {
        log.debug('Prepare called in item with url:', item.url)

        // Schedule reload if needed
        if(item.reload && item.preload) {
          timers.push(setTimeout(() => {
            view.webContents.reloadIgnoringCache()
          }, (Math.max(showtime - item.preload, 0) * 1000)))
        }

        // Schedule to show this item
        timers.push(setTimeout(() => {
          view.setBounds({ x: 0, y: 20, width: this.myDisplay.size.width, height: (this.myDisplay.size.height - 20) })
          this.window.setBrowserView(view)

          if(item.reload && !item.preload)
            view.webContents.reloadIgnoringCache()

          showCount++
          resolve(item)
        }, (showtime * 1000)))

      })
    }

    const clearTimers = () => {
      timers.forEach(clearTimeout)
    }

    item.view = {
      prepareShow,
      clearTimers,
    }
  }
}
