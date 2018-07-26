import { app } from 'electron'
import path from 'path'
import NeDB from 'nedb'
import service from 'feathers-nedb'

export default function() {
  const dbDisplays = new NeDB({
    filename: path.join(app.getPath('userData'), '/db-data/displays'),
    autoload: true
  })

  const displaysService = service({
    name: 'displays',
    Model: dbDisplays,
  })

  displaysService.docs = {

  }

  return displaysService
}
