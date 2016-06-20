'use strict'

const path = require('path')
const glob = require('glob-promise')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const server = jsonServer.create()
server.use(jsonServer.defaults({
  logger: false
}))
server.use(bodyParser.json())
glob('./modules/**/index.js')
  .then(modules => {
    modules.forEach(module => {
      require(`./${module}`)(server)
    })
    return glob('./mockData/*.json')
  })
  .then(mocks => {
    server.use(
      jsonServer.router(
        mocks.reduce((db, mock) => {
          db[mock.replace('./mockData/', '').replace('.json', '')] = require(`./${mock}`)
          return db
        }, {})
      )
    )
    server.listen(3000, () => console.log('web-service listening on port 3000'))
  })
  .catch(err => console.log(err));
