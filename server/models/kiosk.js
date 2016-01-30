var mongoose = require('mongoose'),
    relationship = require("mongoose-relationship"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var KioskSchema = new Schema({
    name: {type: String, required: true },
    location: {type: String, required: true},
    mac: {type: String, required: true},
    // each kiosk has many users
    users: [{type: ObjectId, ref:"User"}]
});


var KioskModel = mongoose.model('Kiosk', KioskSchema);

module.exports = KioskModel;
