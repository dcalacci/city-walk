var noble = require('noble'),
    _ = require('underscore'),
    app = require('./app.js');



function maybeSendScan(macAddress) {
    app.userService.find(
        {
            query: {
                macAddress: macAddress
            }
        }).then(function(users) {
            console.log('Users walked by:', users);
    });
}


function startScanning() {
    noble.state = "poweredOn";
    noble.startScanning();

    noble.on("discover", function(peripheral) { 
        var macAddress = peripheral.uuid;
        var rss = peripheral.rssi;
        var localName = peripheral.advertisement.localName; 
        console.log('found device: ', macAddress, ' ', localName, ' ', rss);
        maybeSendScan(macAddress);
    });
}

module.exports = {
    startScanning: startScanning  
};
