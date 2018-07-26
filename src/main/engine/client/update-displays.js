import _ from 'lodash'
import os from 'os'
import { screen } from 'electron'
import { displaysService } from '../client'

const myHostname = os.hostname()

export function UpdateDisplays() {
  return new Promise((resolve, reject) => {
    const actDisplays = screen.getAllDisplays()
    const strDisplays = []

    displaysService.find({ hostname: myHostname })
      .then((resDisplays) => {
        resDisplays.forEach(d => strDisplays.push(d._id))

        // Update all displays or create displays
        return Promise.all(actDisplays.map((ad) => {

          // If display not in database
          const dbIndex = _.findIndex(resDisplays, ['id', ad.id])
          if(dbIndex === -1) {
            Object.assign(ad, {
              lastConnected: new Date(),
              connected: true,
              enabled: false,
              hostname: myHostname,
            })
            return displaysService.create(ad)
          }

          // If in database remove from deaktivate list and update display
          strDisplays.splice(strDisplays.indexOf(resDisplays[dbIndex]._id), 1)
          Object.assign(ad, {
            lastConnected: new Date(),
            connected: true,
            hostname: myHostname,
          })
          return displaysService.patch(resDisplays[dbIndex]._id, ad)
        }))
      })
      // Deaktivate displays not around (left in strDisplays)
      // TODO: For multiclient server needs to take hostname in mind
      .then((updDisplays) => {
        return Promise.all(strDisplays.map(dd => displaysService.patch(dd, { connected: false })))
      })
      .then(resolve)
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}
