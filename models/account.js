var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
    username: String,
    password: String
});

AccountSchema.plugin(passportLocalMongoose);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/passport_local_mongoose_express4', function(error, db) {
    if (error) { throw error; }
});

module.exports = mongoose.model('Account', AccountSchema);

