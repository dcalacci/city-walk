var React = require("react");
var ReactDOM = require("react-dom");
var Tabs = require("material-ui/lib/tabs/tabs");
var Tab = require("material-ui/lib/tabs/tab");
var Slider = require("material-ui/lib/slider");
/* var Map = require("./mapboxMap").Map; */

var LoginForm = require("login/loginComponents").Form;



// tap plugin!
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

function handleActive(tab) {
    console.log(`A tab with this route property ${tab.props.route} was activated.`);
}


var TabsExampleSimple = function() {
    return (
    <Tabs>
        <Tab label="Login" >
            <LoginForm url="18.111.9.233:3000/login"></LoginForm>
        </Tab>
        <Tab label="Nearby" >
            <div>
                <h2 style={styles.headline}>Nearby</h2>
                <p>
                    This is another example tab.
                    
                </p>
            </div>
        </Tab>
        <Tab
            label="My Activity"
            route="/home"
            onActive={handleActive}>
            <div>
                <h2 style={styles.headline}>My Activity</h2>
                <p>
                    This is a third example tab.
                </p>
            </div>
        </Tab>
    </Tabs>
)};

exports.TabNav = TabsExampleSimple;
