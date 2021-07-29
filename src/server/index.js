const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./route');
const User = require('./User');
const Group = require('./Group');
const Folder = require('./Folder');
const Post = require('./Post');
const { group } = require('@angular/animations');

var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
    }
});


mongoose.connect('mongodb://127.0.0.1/textapp');

mongoose.connection.on('connected', () =>{
    console.log('Connected to Database!');
});

mongoose.connection.on('error', (err) =>{
    if (err) throw err;
});

app.use(bodyparser.json());
app.use(cors());
app.use('/api',route);

const PORT = 3000;

server.listen(PORT,function(err){
    if (err) throw err;
});

// const io = new Server(server);

// socket.io code in backend start
io.on('connection', (socket) => {
    // socket.id=1;
    console.log(socket.id,' Connected to socket.io');

    socket.on("changesocketid", (data) =>{
        socket.id=data.uid;
        console.log("Socket ID changed to : ", socket.id);
    });

    socket.on('addusertogroup', (data) => {
        console.log(data.uids);
        var i;
        for(i in data.uids){
            User.findOneAndUpdate({id: data.uids[i]}, {$push: {groups: data.groupid}},{useFindAndModify: false}, function(err){
                if(err){
                    console.log("Error While updating User while adding it to group");
                }
                else{
                    console.log("User successfully updated")
                }
            });
        }
        Group.findByIdAndUpdate(data.groupid,{$push: {users: {$each: data.uids}}},{useFindAndModify: false},function(err){
            if(err){
                console.log("Error While updating Group while adding it to group");
                throw(err);
            }
            else{
                console.log("Group successfully updated");
                Group.findById(data.groupid,function(err,group){
                    if(group){
                        io.emit("useraddedtonewgroup",{userids: data.uids, group:group});
                    }
                    else if(err){
                        console.log("Error while getting Group after updating it when a new user was added")
                    }
                })
            }
        });        
    });

    socket.on('joingroup', (data) => {
        console.log("Checking socket.io joingroup");
        // console.log(data.folders[0]);

        socket.join(data._id);
    });

    socket.on('joinfolder', (data) => {
        // console.log("socket join folder : ", data.room);
        // console.log(data);
        socket.join(data.room);
    });

    socket.on('addnewfolder', (data) => {
        io.in(data.group._id).emit('newfolderadded',data);
        // console.log('socket addnewfolder data: ',data);
        Group.findByIdAndUpdate(data.group._id,{$push:{folders: data.folder}},{useFindAndModify: false}, (err,res) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("Folder added");
            }
        });

    });

    socket.on('addnewpost', (data) => {
        io.in(data.group._id+data.folder.id).emit('newpostadded',data);
        console.log("socket backend addnewpost check");
        // console.log(data);

        Group.findByIdAndUpdate(data.group._id,{folders: data.group.folders}, (err,res) => {
            if(err){
                console.log("Error in updating group while adding post\n");
            }
            else{
                console.log("Group successfully updated in mongodb while adding post");
            }
        });
    });

});
// socket.io code in backend end

app.get('/' ,(req,res) => {
    res.send('Hey I am working');
});