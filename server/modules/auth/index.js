'use strict'

const jwt = require('jwt-simple')
const fs = require('fs-promise')
const config = require('./lib/utils').config
const ensureAuthenticated = require('./lib/utils').ensureAuthenticated
const generateToken = require('./lib/utils').generateToken
const qs = require('querystring')
const request = require('request-promise')
const mockPath = './mockData/user.json'

module.exports = (server) => {
  server.post('/auth/signup', (req, res) => {
    fs.readJson(mockPath)
      .then(data => {
        req.body.id = data.length
        data.push(req.body)
        fs.outputJson(mockPath, data)
        return req.body
      })
      .then((user) => {
        res.json({
          token: jwt.encode(req.body, config.TOKEN_SECRET),
          user
        })
      })
      .catch(err => console.log(err))
  })

  server.post('/auth/login', (req, res) => {
    fs.readJson(mockPath)
      .then(users => {
        var user = users.find(item => item.email === req.body.email);
        if (user) {
          if (user.password === req.body.password) {
            delete user.password
            const token = generateToken(user)
            res.json({
              token,
              user,
            })
          }else {
            res.status(403).json({
              message: 'forbidden',
            })
          }
        }else {
          res.status(403).json({
            message: 'forbidden',
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'server error',
        })
      })
  })

  server.post('/auth/github', (req, res) => {
    const accessTokenUrl = 'https://github.com/login/oauth/access_token'
    const userApiUrl = 'https://api.github.com/user'
    /*eslint camelcase:0*/
    const params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.GITHUB_SECRET,
      redirect_uri: req.body.redirectUri,
    }

    // Step 1. Exchange authorization code for access token.
    request({method: 'GET', url: accessTokenUrl, qs: params })
      .then((err, response, accessToken) => {
        accessToken = qs.parse(accessToken)
        const headers = {'User-Agent': 'Satellizer'}
        // Step 2. Retrieve profile information about the current user.
        return Promise.all([
          request({method: 'GET', uri: userApiUrl, qs: accessToken, headers: headers, json: true}),
          fs.readJson(mockPath),
        ])
      })
      .then(response =>{
        const profile = response[0]
        const users = response[1]
        if (req.headers.authorization) {
          const existingUser = users.find(item => item.github === profile.id);
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' })
          }
          var token = req.headers.authorization.split(' ')[1]
          var payload = jwt.decode(token, config.TOKEN_SECRET)
          if (!payload.user) {
            return res.status(400).send({ message: 'User not found' })
          }
          payload.user.github = profile.id
          payload.user.picture = profile.avatar_url
          payload.user.name = profile.name
          const indexOfUser = users.indexOf(users.find(item => item.id === payload.id))
          users[indexOfUser] = payload.user
          return fs.fs.outputJson(mockPath, users)
        } else {
          const existingUser = users.find(item => item.github === profile.id)
          if (existingUser) {
            return res.json({
              token: generateToken(existingUser),
            })
          }
          const user = {
            github: profile.id,
            picture: profile.avatar_url,
            displayName: profile.name,
          }
          users.push(user)
          return fs.fs.outputJson(mockPath, users)
        }
      })
      .then(user => {
        const token = generateToken(user)
        res.json({
          token,
          user,
        })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({
          message: 'server error',
        })
      })
  })

  server.get('/auth/me', ensureAuthenticated, (req, res) => {
    res.json(req.user)
  })
}
