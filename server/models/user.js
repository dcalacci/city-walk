var mongoose = require('mongoose'),
    relationship = require("mongoose-relationship"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true },
    password: {type: String, required: true},
    mac: {type: String, required: true},
    // each user can have multiple kiosks
    kiosks: [{ type: Schema.ObjectId, ref: "Kiosk", childPath: "users" }],
    createdAt: {type: Date, 'default': Date.now},
    updatedAt: {type: Date, 'default': Date.now}
});

// users have parents, that are kiosks
UserSchema.plugin(relationship, { relationshipPathName: 'kiosks' });


var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
