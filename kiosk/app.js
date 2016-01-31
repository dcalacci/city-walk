var feathers = require('feathers-client'),
    winston = require('winston'),
    noble = require('noble'),
    io = require('socket.io-client');

var scanner = require('./scanner');



var thisKiosk = {
    name: 'MIT Media Lab',
    location: "75 Amherst Street, Cambridge, MA",
    mac: "001a7dda7113",
    users: []
};



function createThisKiosk(kioskService) {
    kioskService.create(thisKiosk,
                        {},
                        function(error, data) {
                            console.log("create:", error, data);
                        });
}



function maybeCreateKiosk(socket) {
    var app = feathers().configure(feathers.socketio(socket));

    var userService = app.service('users');
    var kioskService = app.service('kiosks');


    kioskService.find(
        {
            query: {
                name: thisKiosk.name,
                location: thisKiosk.location
            }
            
        }, function(error, kiosks) {
            console.log(error,kiosks);
            if (kiosks.length == 0) {
                console.log("creating kiosk...");
                createThisKiosk(kioskService);
            }
        });

    scanner.startScanning(app);
}


function startup() {

    // var url = "breakout.media.mit.edu";
    var url = "breakout.media.mit.edu";

    // set up raw socket for custom events.
    var socket = io.connect(url, {'transports': [
        'websocket',
        'flashsocket',
        'jsonp-polling',
        'xhr-polling',
        'htmlfile'
    ]});

    
    console.log("emitting event...");
    socket.emit('kiosk::create', {
        description: 'I really have to iron'
    }, {}, function(error, data) {
        console.log("error, data", error, data);
    });
    
    socket.on("connect", function() {
        winston.log("info", "connected!");
        maybeCreateKiosk(socket);
    });
}

startup();


