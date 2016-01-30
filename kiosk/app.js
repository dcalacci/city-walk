var feathers = require('feathers-client'),
    winston = require('winston'),
    noble = require('noble'),
    socketio = require('socketio');

var scanner = require('./scanner');

scanner.startScanning();


