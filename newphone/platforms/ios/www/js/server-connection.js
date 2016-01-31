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



var app = feathers().configure(feathers.socketio(socket));

// to get user and kiosk services
var userService = app.service('users');
var kioskService = app.service('kiosks');

// to get 'steps' service
app.service('steps').create(
  {
    steps: 500,
    user: "Yan" // this will change once we do actual authentication
  } );


var userName = "Yan";
// you also do, for example:
    app.service('steps').find(
        {
            query: {
                user: userName
            }
        }).then(function(steps) {
            console.log('Step records:', steps);
    })