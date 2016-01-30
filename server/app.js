var feathers = require('feathers');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongooseService = require('feathers-mongoose');
var winston = require('winston');

// export app as module so we can require it later.
var app = module.exports = feathers();

var User = require('./models/user');
var Kiosk = require('./models/kiosk');


// Tell mongoose to use native promises
// See http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
// Connect to your MongoDB instance(s)
mongoose.connect('mongodb://localhost:27017/feathers');


var port = 3000;


app.configure(feathers.rest())
    //.configure(hooks())
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
            // create all listeners
            listener.listen(socket);
            // do authentication here (eventually)
            
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


app.use('/users', mongooseService({ Model: User }));

app.use('/kiosks', mongooseService({ Model: Kiosk }));

app.listen(port, function() {
    console.log('Feathers server listening on port ' + port);
});

// configure all hooks
//my_hooks.configure_hooks(app);
