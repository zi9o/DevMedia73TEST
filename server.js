var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var logger = require('morgan')
var config = require('./config')
var mongoose = require('mongoose')
var colors = require('colors')
var cors = require('cors')

var pathfinderUI = require('pathfinder-ui') // module for displaying routes
mongoose.Promise = global.Promise; // globale promise

// Connect to database
mongoose.connect(config.database, function (err) {
  if (err) {
    console.log('Error connecting to database')
  } else {
    console.log('Connected to database')
  }
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static(__dirname + '/Public'))


var apiTask = require('./app/API/apiTasks')(app, express)
app.use('/api/tasks', apiTask)

// this below allows to show the RESTful API requests' tree by typing localhost:port/pathfinder
app.use('/pathfinder', function (req, res, next) {
  pathfinderUI(app)
  next()
}, pathfinderUI.router)

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/Public/app/views/index.html')
})

// port listen 3000
app.listen(config.port, function (err) {
  if (err) {
    console.log(err)
  }else {
    console.log('listen on Port : ',config.port)
  }
})
