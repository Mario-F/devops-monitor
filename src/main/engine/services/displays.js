import log from 'electron-log'
import { app } from 'electron'
import path from 'path'
import NeDB from 'nedb'
import service from 'feathers-nedb'

export default function() {
  const dbDisplays = new NeDB({
    filename: path.join(app.getPath('userData'), '/db-data/displays'),
    autoload: true
  })
  dbDisplays.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
    if(err) log.error(err)
  })

  const displaysService = service({
    name: 'displays',
    Model: dbDisplays,
  })

  displaysService.docs = {
    idType: 'string',
  }

  return displaysService
}
