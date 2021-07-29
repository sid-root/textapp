const Post=require('./Post');

Folder={
    name:String,
    id:String,
    description: String,
    posts: [Post],
}

module.exports=Folder;