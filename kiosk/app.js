var feathers = require('feathers-client'),
    winston = require('winston'),
    noble = require('noble'),
    io = require('socket.io-client');

var scanner = require('./scanner');


var url = "104.131.120.222";

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


var app = feathers().configure(feathers.socketio(socket));

var userService = app.service('users');
var kioskService = app.service('kiosks');




var thisKiosk = {
    name: 'MIT Media Lab',
    location: "75 Amherst Street, Cambridge, MA",
    mac: "",
    users: []
};

socket.emit("kiosk::create", thisKiosk, function(error, data) {
    console.log(error, data);
});

kioskService.create(thisKiosk);


function startup() {
    console.log("starting up..");
    kioskService.find(
        {
            query: {
                name: thisKiosk.name,
                location: thisKiosk.location
            }
            
        }
    ).then(function(kiosks) {
        console.log("got kiosks:");
        if (kiosks.length == 0) {
            kioskService.create(thisKiosk);
        }
    });
}


startup();
scanner.startScanning(app);
