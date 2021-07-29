const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');
const Group = require('./Group');
const Folder = require('./Folder');
const Post = require('./Post');

var route = express.Router();

route.get('/users',function(req,res){
    User.find((err,user)=>{
        res.json(user);
        console.log(user);
    });
    console.log('user found');
});

route.get('/groups',function(req,res){
    Group.find((err,group)=>{res.json(group);});
});

route.get('/group/:gid',function(req,res){
    Group.findById(req.params.gid,function(err,grp){
        res.json(grp);
    });
});

route.get('/groupsbyuser/:u_id',function(req,res){
    Group.find({users:{$in: [req.params.u_id]}},function(err,groups){
        res.json(groups);
    });
});

var urlencodedParser = bodyParser.urlencoded({extended: true});

route.post('/sign_in',urlencodedParser,function(req,res){
    let user = new User({
        id: req.body.id,
        password: req.body.password,
        // groups: req.body.groups
    });

    user.save(function(err){
        if (err) throw err;
    });
});

route.post('/addgrp',urlencodedParser,function(req,res){
    folders=[];
    
    let grp = new Group({
        users: req.body.users,
        creator: req.body.creator,
        description: req.body.description,
        name: req.body.name,
        folders:folders
        // _id: req.body._id,
    });

    grp.save().then(function(grp){
        res.send(grp._id);
        console.log(grp);
    });
});


route.put('/addfol2',urlencodedParser,function(req,res){
    console.log(req.body);
    console.log(req.body.folders)

    Group.findByIdAndUpdate(req.body._id,{ folders: req.body.folders }, function(err,doc){
        if (err){
            console.log("Error in addfol2 route\n");
        }
        console.log("checking new folder")
        console.log(doc);
        res.json(doc);
    })

    console.log("donedone");
});

route.put('/addfol/:gid/:folid',urlencodedParser,function(req,res){
    
    console.log(req.body)
    let folder={
    name: req.body.name,
    description: req.body.description,
    posts: req.body.posts,
    id: req.params.folid
    }

    Group.findByIdAndUpdate(req.params.gid,{
        $push:{
            folders: folder
        }
    })
    console.log("folder added");
});

route.put('/addpost/:gid/:folid',urlencodedParser,function(req,res){
    Group.findById(req.params.id,function(err,group){

    });

    var post=new Post();
    post.text=req.body.text;
    post.userid=req.params.userid;
    _folders=grp.folders;

    for(i in _folders){
        if(_folders[i].id==req.params.folid){
            _folders[i].posts.push(post);

        }
    }

    Group.findByIdAndUpdate(req.params.gid, { folders: _folders }).then(t => {res.send("I am working")});

});

route.get('/accounts/:user_id/:password', function(req, res){
    var acc = User.find({id: req.params.user_id, password: req.params.password},function(err,account){
        res.json(account);
    }).orFail(new Error('User Id or Password Invalid'));
});

route.get('/accs/:u_id',function(req,res){
    User.find({id: req.params.u_id},function(err,user){
        res.json(user);
    })
});

route.put('/updategrparray/:uid',urlencodedParser,function(req,res){
    console.log("Check Adding Group",req.body.group);
    User.findOneAndUpdate({id: req.params.uid}, {$push: {groups: req.body.group._id}},{useFindAndModify: false}, function(err){
        if(err){
            console.log("Error While updating User while adding it to group");
        }
        else{
            console.log("User successfully updated")
        }
    });
});



module.exports = route;