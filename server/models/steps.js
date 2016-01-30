var mongoose = require('mongoose'),
    relationship = require('mongoose-relationship'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Objectid;

var StepSchema = new Schema({
    stepCount: {type: Number, required: true},
    createdAt: {type: Date, 'default': Date.now},
    updatedAt: {type: Date, 'default': Date.now},
    // each step count has one user
    user: {type: String, required: true}
    //user: {type: Schema.ObjectId, ref: "User", childPath: "steps"}
});

//StepSchema.plugin(relationship, {relationshipPathName: 'users'});

var StepModel = mongoose.model('Steps', StepSchema);

module.exports = StepModel;
