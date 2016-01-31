
var React = require("react");
var ReactDOM = require("react-dom");
var HomeComponents = require("home/homeComponents");
var Home = HomeComponents.Home;


var app = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log("Device ready, will try to render React component!");

        
        var mountNode = document.getElementById('reactAppContainer');
        ReactDOM.render(<Home name="Dear User!" />, mountNode);
        
        console.log("React should now be loaded");
    }

};

app.initialize();

