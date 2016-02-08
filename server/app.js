var feathers = require('feathers');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongooseService = require('feathers-mongoose');
var winston = require('winston');

// export app as module so we can require it later.
var app = module.exports = feathers();

var User = require('./models/user');
var Kiosk = require('./models/kiosk');
var Steps = require('./models/steps');
var Scans = require('./models/steps');


// DATABASE
// Tell mongoose to use native promises
// See http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
// Connect to your MongoDB instance(s)
mongoose.connect('mongodb://localhost:27017/feathers');

///////////////////////////
var port = 3000;

app.configure(feathers.rest())
    .configure(feathers.socketio(function(io) {

        // enable all transports (optional if you want flashsocket support, please note that some hosting
        // providers do not allow you to create servers that listen on a port different than 80 or their
        // default port)
        io.set('transports', [
            'websocket'
            , 'flashsocket'
            , 'htmlfile'
            , 'xhr-polling'
            , 'jsonp-polling'
        ]);

        io.on('connection', function(socket) {
            socket.on('connect', function() {
                winston.log("info", ">>>>> Client connected");
            });
            
            socket.on('disconnect', function() {
                winston.log("info", ">>>>>>>>Client disconnected");
            });

        });
    }))
    // public folder, static
    .use(feathers.static(__dirname + '/public'))
    // Turn on JSON parser for REST services
    .use(bodyParser.json())
    // Turn on URL-encoded parser for REST services
    .use(bodyParser.urlencoded({extended: true}));



// USERS ////////////////////////////////////////////////////



//app.use('/users', memory());
app.use('/users', mongooseService({ Model: User }));
app.use('/kiosks', mongooseService({ Model: Kiosk }));
app.use('/steps', mongooseService({ Model: Steps }));
app.use('/scans', mongooseService({ Model: Scans }));

app.listen(port, function() {
    console.log('Feathers server listening on port ' + port);
});


app.service('/steps').on("create", function() {
    winston.log("info", "new steps created!");
});

app.service('/kiosks').on("create", function() {
    winston.log("info", "new steps created!");
});

app.service('/scans').on("create", function() {
    winston.log("info", "new scan created!");
});

// configure all hooks
//my_hooks.configure_hooks(app);
