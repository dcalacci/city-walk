(function($){
    $(function(){

        $('.button-collapse').sideNav();

        $(document).ready(function(){
            $('ul.tabs').tabs();
        });

        $('#ble-button').click(function() {
            window.plugins.ble.scan([], 20, function(peripheral) {
                var macAddress = peripheral.id;
                var rss = peripheral.rssi;
                var localName = peripheral.name; 
                console.log('found device: ', macAddress, ' ', localName, ' ', rss);
            });
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space



function checkScan(scan) {
    console.log("new scan:");
}


var socket = io('18.111.9.233:3000');
var app = feathers()
    .configure(feathers.socketio(socket));
var scanService = app.service('scans');

scansService.on('created', function(scan) {
    console.log('Scan created', checkScan);
});



