'use strict'

const path = require('path')
const glob = require('glob-promise')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const server = jsonServer.create()
server.use(jsonServer.defaults())
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
    server.listen(3001, () => console.log('web-service listening on port 3001'))
  })
  .catch(err => console.log(err));
