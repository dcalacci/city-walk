/** @jsx React.DOM */

var React = require("react");
var ReactDOM = require("react-dom");
var $ = require("jquery");
var _ = require("underscore");

var Footer = require("common/commonComponents").Footer;
var TabNav = require("common/tabs").TabNav;
var AppBar = require("material-ui/lib/app-bar");


var Home = React.createClass({
      render: function() {
          return (
              <div style={{ padding: '0px' }}>
                  <AppBar title="CityWalk"/>
                  <TabNav />
              </div>
        );
      }
});

exports.Home = Home;


var Content = React.createClass({

      // Just to show it's possible to manipulate DOM with JQuery inside React
      componentDidMount: function() {
        var self = this;
        var counter = 0;
        setInterval(function() {
            counter++;
            $(ReactDOM.findDOMNode())
              .find(".jqueryUptadable")
              .text("Updated by JQuery! -> "+counter);
        },1000);
        console.debug("interval set");

      },

      render: function() {
        return (
            <div className="reactComponentContainer">
                    <h1>Hello {this.props.name}</h1>
                    <p>This is rendered with a React JSX Component! yeah2</p>
                    <div>
                        <img src="img/logo.png"/>
                    </div>
                    <div className="jqueryUptadable">
                        This should be updated soon by JQuery
                    </div>
            </div>
        );
      }

});
exports.Content = Content;
