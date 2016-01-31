var React = require("react");
var ReactDOM = require("react-dom");
var feathers = require("feathers-client");
var $ = require("jquery");
var FMUI = require('formsy-material-ui');
var FormsyCheckbox = FMUI.FormsyCheckbox;
var FormsyDate = FMUI.FormsyDate;
var FormsyRadio = FMUI.FormsyRadio;
var FormsyRadioGroup = FMUI.FormsyRadioGroup;
var FormsySelect = FMUI.FormsySelect;
var FormsyText = FMUI.FormsyText;
var FormsyTime = FMUI.FormsyTime;
var FormsyToggle = FMUI.FormsyToggle;
var RaisedButton = require('material-ui/lib/raised-button');
var Styles = require('material-ui/lib/styles');
var Paper = require('material-ui/lib/paper');

var Form = React.createClass({


    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },

    getInitialState() {
        return {
            canSumbit: false
        };
    },

    errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number",
        urlError: "Please provide a valid URL",
        emailError: "Please provide a valid email"
    },

    selectFieldItems: [
        { payload: 'never', text: 'Never' },
        { payload: 'nightly', text: 'Every Night' },
        { payload: 'weeknights', text: 'Weeknights' },
        { payload: 'weekends', text: 'Weekends' },
        { payload: 'weekly', text: 'Weekly' }
    ],

    styles: {
        paperStyle: {
            width: 300,
            margin: 20,
            padding: 20
        },
        switchStyle: {
            marginBottom:16
        },
        submitStyle: {
            marginTop: 32
        }
    },

    enableButton() {
        this.setState({
            canSubmit: true
        });
    },

    disableButton() {
        this.setState({
            canSubmit: false
        });
    },

    submitForm(data) {
        console.log(this.props.url);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                console.log("data from post:", data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        console.log(JSON.stringify(data, null, 4));
    },

    notifyFormError(data) {
        console.error('Form error:', data);
    },

    render() {
        return (
            <Paper style={this.styles.paperStyle}>

                <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError} >

                    <FormsyText
                        name="username"
                        validations="isWords"
                        validationError={this.errorMessages.wordsError}
                        required
                        hintText="What should we call you?"
                        floatingLabelText="Username" />

                    <FormsyText
                        name="password"
                        validations="isWords"
                        validationError={this.errorMessages.wordsError}
                        required
                        hintText="Your secret key"
                        floatingLabelText="Password" />

                    <FormsyText
                        name="email"
                        hintText="What is your email?"
                        validations="isEmail"
                        validationError={this.errorMessages.emailError}
                        floatingLabelText="Email" />

                    <RaisedButton
                        style={this.styles.submitStyle}
                        type="submit"
                        label="Submit"
                        disabled={!this.state.canSubmit} />
                </Formsy.Form>
            </Paper>
        );
    }
});

exports.Form = Form;
