var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");
require("leaflet");

var Map = React.createClass({displayName: "Map",

                             createMap: function (element) {
                                 var map = L.map(element);
                                 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                                     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                 }).addTo(map);
                                 return map;
                             },

                             setupMap: function () {
                                 this.map.setView([this.props.lat, this.props.lon], 13);
                             },

                             componentDidMount: function () {

                                 if (this.props.createMap) {
                                     this.map = this.props.createMap(ReactDOM.findDOMNode(this));
                                 } else {
                                     this.map = this.createMap(ReactDOM.findDOMNode(this));
                                 }

                                 this.setupMap();
                             },

                             render: function () {
                                 return (
                                 <div class="map"> </div>
                                 );
                             }

});

exports.Map = Map;
