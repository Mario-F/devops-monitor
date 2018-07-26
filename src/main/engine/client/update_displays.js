import _ from 'lodash'
import os from 'os'
import { screen } from 'electron'
import { displaysService } from '../client'

export function UpdateDisplays() {
  return new Promise((resolve, reject) => {
    const actDisplays = screen.getAllDisplays()
    const strDisplays = []

    displaysService.find()
      .then((resDisplays) => {
        resDisplays.forEach(d => strDisplays.push(d._id))

        // Update all displays or create displays
        return Promise.all(actDisplays.map((ad) => {
          ad._id = ad.id

          // If display not in database
          if(_.findIndex(resDisplays, ['_id', ad._id]) === -1) {
            Object.assign(ad, {
              lastConnected: new Date(),
              connected: true,
              enabled: false,
              hostname: os.hostname(),
            })
            return displaysService.create(ad)
          }

          // If in database remove from deaktivate list and update display
          strDisplays.splice(strDisplays.indexOf(ad._id), 1)
          Object.assign(ad, {
            lastConnected: new Date(),
            connected: true,
            hostname: os.hostname(),
          })
          return displaysService.patch(ad._id, ad)
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
