var feathers = require('feathers-client'),
    winston = require('winston'),
    noble = require('noble'),
    io = require('socketio');

var scanner = require('./scanner');


window.state.url = "18.85.24.150:3000";

// set up raw socket for custom events.
var socket = io.connect(window.state.url, {'transports': [
    'websocket',
    'flashsocket',
    'jsonp-polling',
    'xhr-polling',
    'htmlfile'
]});

var app = feathers()
    .configure(feathers.socketio(socket));

var userService = app.service('users');
var kioskService = app.service('kiosks');


var thisKiosk = {
    name: 'MIT Media Lab',
    location: "75 Amherst Street, Cambridge, MA",
    mac: "",
    users: []
};

function startup() {
    kioskService.find(
        {
            query: {
                name: thisKiosk.name,
                location: thisKiosk.location
            }
            
        }
    ).then(function(kiosks) {
        if (kiosks.length == 0) {
            kioskService.create(thisKiosk);
        }
    });
}



scanner.startScanning();



