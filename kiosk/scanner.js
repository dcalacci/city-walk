var noble = require('noble'),
    _ = require('underscore');

function startScanning() {
    noble.startScanning();

    noble.on("discover", function(peripheral) { 
        var macAddress = peripheral.uuid;
        var rss = peripheral.rssi;
        var localName = peripheral.advertisement.localName; 
        console.log('found device: ', macAddress, ' ', localName, ' ', rss);   
    });
}


module.exports = {
    startScanning: startScanning  
};
