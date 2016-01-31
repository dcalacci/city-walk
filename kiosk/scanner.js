var noble = require('noble'),
    winston = require('winston'),
    _ = require('underscore'),
    app = require('./app');



function maybeSendScan(macAddress, app) {
    app.service('users').find(
        {
            query: {
                macAddress: macAddress
            }
        }).then(function(users) {
            var user = users[0];
            app.service('scans').create(
                {
                    user: user._id,
                    kiosk: "kiosk1"
                }
            );
            console.log('Users walked by:', users);
    });
}


function startScanning(app) {
    noble.state = "poweredOn";

    noble.startScanning();
    setInterval(function() {
        winston.log("info", "scanning...");
        // no idea why this doesnt work
        setTimeout(function() {
            noble.stopScanning();
        }, 15000);
        noble.startScanning();
    }, 20000);
    
    winston.log("info", 'scanning!');

    noble.on("discover", function(peripheral) { 
        var macAddress = peripheral.uuid;
        var rss = peripheral.rssi;
        var localName = peripheral.advertisement.localName; 
        console.log('found device: ', macAddress, ' ', localName, ' ', rss);
        maybeSendScan(macAddress, app);
    });
}

module.exports = {
    startScanning: startScanning  
};
