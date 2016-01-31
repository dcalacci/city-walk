var mongoose = require('mongoose'),
    relationship = require("mongoose-relationship"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var ScanSchema = new Schema({
    user: {type: ObjectId, required: true },
    kiosk: {type: String, required: true},
    createdAt: {type: Date, 'default': Date.now}
});


var ScanModel = mongoose.model('Kiosk', ScanSchema);

module.exports = ScanModel;
