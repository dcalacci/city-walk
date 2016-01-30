var feathers = require('feathers');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongooseService = require('feathers-mongoose');
var winston = require('winston');

// all for auth...
var passport = require('passport');
var crypto = require('crypto');
var hooks = require('feathers-hooks');
var memory = require('feathers-memory');
var session = require('express-session');
var feathersPassport = require('../lib/passport');
var LocalStrategy = require('passport-local').Strategy;

// export app as module so we can require it later.
var app = module.exports = feathers();

var User = require('./models/user');
var Kiosk = require('./models/kiosk');


// DATABASE
// Tell mongoose to use native promises
// See http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
// Connect to your MongoDB instance(s)
mongoose.connect('mongodb://localhost:27017/feathers');


// AUTH
// SHA1 hashes a string
var sha1 = function(string) {
    var shasum = crypto.createHash('sha1');
    shasum.update(string);
    return shasum.digest('hex');
};

// A shared session store must be provided.
// This MemoryStore is not recommended for production
var store = new session.MemoryStore();


///////////////////////////
var port = 3000;

app.configure(feathers.rest())
    .configure(hooks())
    .configure(feathersPassport({
        // Secret must be provided
        secret: 'medialab',
        // Also set a store
        store: store,
        resave: true,
        saveUninitialized: true
    }))

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

// Add a login route for the passport login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html',
    failureFlash: false
}));

//app.use('/users', memory());
app.use('/users', mongooseService({ Model: User }));

var userService = app.service('/users');
userService.before({
    create: function(hook, next) {
        var password = hook.data.password;
        // Replace the data with the SHA1 hashed password
        hook.data.password = sha1(password);
        next();
    }
});

// Use the id to serialize the user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize the user retrieving it form the user service
passport.deserializeUser(function(id, done) {
    // Get the user service and then retrieve the user id
    userService.get(id, {}, done);
});

// Attach the local strategy
passport.use(new LocalStrategy(function(username, password, done) {
    var query = {
        username: username
    };

    userService.find({ query: query }, function(error, users) {
        if(error) {
            return done(error);
        }

        var user = users[0];

        if(!user) {
            return done(new Error('User not found'));
        }

        // Compare the hashed password
        if(user.password !== sha1(password)) {
            return done(new Error('Password not valid'));
        }

        done(null, user);
    });
}));


// Create a user that we can use to log in
userService.create({
    username: 'test',
    password: 'secret'
}, {}, function(error, user) {
    console.log('Created default user', user);
});

////////////////////////////////////////////////////////////////

app.use('/kiosks', mongooseService({ Model: Kiosk }));

app.listen(port, function() {
    console.log('Feathers server listening on port ' + port);
});

// configure all hooks
//my_hooks.configure_hooks(app);
