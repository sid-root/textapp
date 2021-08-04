const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    // name:{type: String},
    id:{type: String, unique: true, required:true, dropDups: true},
    password:{type: String},
    groups: [String],
    email: {type: String, unique: true, required:true, dropDups: true},
    resetlink: {type: String}
});

const User= mongoose.model('User',UserSchema);
module.exports = User;