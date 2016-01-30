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
            console.log('Users walked by:', users);
    });
}


function startScanning(app) {
    noble.state = "poweredOn";
    noble.startScanning();
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
