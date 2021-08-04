const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');
const Group = require('./Group');
const Folder = require('./Folder');
const Post = require('./Post');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');
const lodash=require('lodash');
const saltrounds=11;
const result = require('dotenv').config({path: '../.env'});

if(result.error){
    throw result.error
}

// console.log(result.parsed);

var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

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
    console.log("Checking sign in");
    console.log(req.body);
    bcrypt.hash(req.body.password,saltrounds,function(err,hash){
        req.body.password=hash;
        console.log("hash: ",hash, "\n\n");
        let user = new User({
            id: req.body.id,
            password: hash,
            email: req.body.email,
            resetlink: req.body.resetlink
        });
    
        user.save(function(err){
            if (err)  console.log(err);
            else{
                console.log("User Added to Database")
            }
        });
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
    var acc = User.findOne({id: req.params.user_id},function(err,account){
        bcrypt.compare(req.params.password,account.password,function(err,result){
            console.log(req.params.password);
            console.log(account.password);
            console.log(account)
            if(err){
                console.log("Error while comparing password");
                throw err;
            }
            else{
                res.json(result)
            }
        })
    })
});

route.get('/accs/:u_id',function(req,res){
    User.findOne({id: req.params.u_id},function(err,user){
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

route.post('/sendotp', urlencodedParser, function(req,res){
    console.log(req.body);

    const data= {
        from: 'testmessaging02@gmail.com',
        to: req.body.email,
        subject:'Account Verification',
        html: `<h3>Your OTP For TextApp</h3>
               <p>${req.body.otp}</a></p>
        `
    }

    transporter.sendMail(data, function(err, info){
        if(err){
            console.log('Error while sending mail');
            console.log(err);
        }
        else{
            console.log('Message sent to email');
            res.json({message: "Otp Sent to email"});
        }
    });
});

const jwtkey=process.env.JWTKEY;


route.put('/forgotpassword',urlencodedParser ,function(req,res){
    User.findOne({email: req.body.email}, (err,doc)=>{
        if(err){
            console.log("Error in getting User while resetting password");
            console.log(jwtkey);    
        }
        else{
            console.log("user found");
            console.log(jwtkey);
            const token=jwt.sign({_id:doc._id},jwtkey,{expiresIn: '15m'});
            console.log(token);
            res.json(token);
            

            const link=`http://${req.body.url}/resetpassword/${doc._id}/${token}`

            const obj={
                resetlink: token
            }

            console.log(link);
            console.log(doc._id)
            const data= {
                from: 'testmessaging02@gmail.com',
                to: doc.email,
                subject:'Account Verification',
                html: `<h3> Please Click on the Link given below to change password</h3>
                       <p><a href='http://${req.body.url}/resetpassword/${doc._id}/${token}'>http://${req.body.url}/resetpassword/${doc._id}/${token}</a></p>
                `
            }
            // return doc.updateOne({reset})
            doc=lodash.extend(doc,obj);
            doc.save((err,result)=>{
                if(err){
                    console.log("Error while saving resetlink in user");
                }
                else{
                    console.log("Mail would be sent");
                    transporter.sendMail(data, function(err, info){
                        if(err){
                            console.log('Error while sending mail');
                        }
                        else{
                            console.log('Message sent to email');
                        }
                    });
                }
            });
        }
    });
});

route.put('/resetpassword',urlencodedParser,function(req,res){
    const token=req.body.token;
    console.log(req.body, token);
    if(token){
        jwt.verify(token,jwtkey,function(err, dcodedtoken){
            if(err){
                console.log("the token is incorrect or expired");
            }
            User.findOne({resetlink: token}, function(err,doc){
                if(err||!doc){
                    console.log("this token doesn't exist for any user");
                    res.send("this token doesn't exist for any user");
                }
                var obj;
                bcrypt.hash(req.body.newpassword, saltrounds, function(err, hash){
                    if(hash){
                        obj={
                            password:hash,
                            resetlink:""
                        }
    
                        doc=lodash.extend(doc,obj);
                        doc.save((err,result)=>{
                            if(err){
                                console.log("Error while saving new password in db")
                                res.send("Error while saving new password in db");
                            }
                            else{
                                console.log('Password reset successfull');
                                res.json("Successfully updated");
                            }
                        })
                    }
                });
            });
        });
    }
});

route.post('/authenticate', urlencodedParser, function(req,res){
    var message="";
    User.findOne({id: req.body.userid},function(err,user){
        if(user){
            res.json({message: "User ID already taken"})
        }
        else{
            
        }
    })
    User.findOne({email: req.body.email}, function(err,user_){
        if(user_){
            message="This Email is already registered";
        }
        else{
            if(message==""){
                message="All Clear";
            }
        }
    });
    res.json({message: message});
})

module.exports = route;