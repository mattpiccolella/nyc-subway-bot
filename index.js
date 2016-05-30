'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const constants = require('./config/constants.js')
const app = express()

// TODO: Verify using page ID.
var VERIFY_TOKEN = constants.VERIFY_TOKEN

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('Running on port', app.get('port'))
})