
function makeNewUser(userData) {
    
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
    });
};

    $('input#submitButton').click( function() {
        console.log("button clicked...");
        $('form#loginForm').serialize(), function(data) {
        }

        
        $.post( 'breakout/users', $('form#loginForm').serialize(), function(data) {
            console.log("got data:", data);
        },
                'json' // I expect a JSON response
              );
    });
