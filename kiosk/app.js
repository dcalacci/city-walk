var feathers = require('feathers-client'),
    winston = require('winston'),
    noble = require('noble'),
    io = require('socket.io-client');

var scanner = require('./scanner');

var url = "104.131.120.222";

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



<<<<<<< HEAD


var thisKiosk = {
    name: 'MIT Media Lab',
    location: "75 Amherst Street, Cambridge, MA",
    mac: "",
    users: []
};
=======
function maybeCreateKiosk(socket) {
    var app = feathers().configure(feathers.socketio(socket));

    var userService = app.service('users');
    var kioskService = app.service('kiosks');
>>>>>>> c8c7bde17fe63e7218cb9a0a671e6481afcaad13

socket.emit("kiosk::create", thisKiosk, function(error, data) {
    console.log(error, data);
});

kioskService.create(thisKiosk);


<<<<<<< HEAD
function startup() {
    console.log("starting up..");
=======
>>>>>>> c8c7bde17fe63e7218cb9a0a671e6481afcaad13
    kioskService.find(
        {
            query: {
                name: thisKiosk.name,
                location: thisKiosk.location
            }
            
<<<<<<< HEAD
        }
    ).then(function(kiosks) {
        console.log("got kiosks:");
        if (kiosks.length == 0) {
            kioskService.create(thisKiosk);
        }
=======
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
>>>>>>> c8c7bde17fe63e7218cb9a0a671e6481afcaad13
    });
}

startup();

<<<<<<< HEAD
startup();
scanner.startScanning(app);
=======

>>>>>>> c8c7bde17fe63e7218cb9a0a671e6481afcaad13
