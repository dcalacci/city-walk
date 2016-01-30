var feathers = require('feathers-client'),
    winston = require('winston'),
    noble = require('noble'),
    io = require('socket.io-client');

var scanner = require('./scanner');


var app = module.exports = feathers();

var url = "18.85.24.150:3000";

// set up raw socket for custom events.
var socket = io.connect(url, {'transports': [
    'websocket',
    'flashsocket',
    'jsonp-polling',
    'xhr-polling',
    'htmlfile'
]});

socket.on("connect", function() {
    winston.log("info", "connected!");
});




app.configure(feathers.socketio(socket));

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
