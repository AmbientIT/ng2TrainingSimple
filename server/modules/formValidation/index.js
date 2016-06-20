'use strict'

const mockPath = './mockData/user.json'
const fs = require('fs-promise')

module.exports = (server) => {
  server.get('/isavailable/:email', (req, res) => {
    fs.readJson(mockPath)
      .then(users => {
        users.find(user => user.email === req.params.email)
          ? res.status(400).json({
            message: 'email is not available',
          })
          : res.send()
      })
      .catch(err => console.error(err));
  })
}
