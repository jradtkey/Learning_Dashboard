var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  credential: {type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  phone_number: {type: String, required: true},
  password: {type: String, required: true},
  created_at: {type: Date},
  students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
  lessons: [{type: String}],
})

var User = mongoose.model('User', UserSchema);
