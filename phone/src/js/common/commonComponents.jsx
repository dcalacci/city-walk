/** @jsx React.DOM */

var React = require("react");
var AppBar = require('material-ui/lib/app-bar');



var Footer = React.createClass({
  render: function() {
    return (
        <div className="reactComponentContainer">
            <div className="footer">
            </div>
        </div>
    );
  }
});



var AppBar = React.createClass({
    render: function() {
        return (
            <AppBar
                title="CityWalk"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
});

exports.AppBar = AppBar;
exports.Footer = Footer;
