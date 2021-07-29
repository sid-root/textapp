const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    // name:{type: String},
    id:{type: String},
    password:{type: String},
    groups: [String]
});

const User= mongoose.model('User',UserSchema);
module.exports = User;