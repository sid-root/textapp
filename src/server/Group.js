const mongoose = require('mongoose');
const Folder=require('./Folder');

const GroupSchema= mongoose.Schema({
    folders: [
        {
            name:String,
            id:String,
            description: String,
            posts: [
                {
                    text: String,
                    userid: String
                }
            ],
        }
    ],
    name: {type: String},
    description: {type: String},
    creator: {type: String},
    users: [String]
});

const Group=mongoose.model('Group',GroupSchema);
module.exports=Group;