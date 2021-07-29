import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { Folder, Group, Post, User } from './classes/reqclasses';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket = io('http://localhost:3000');
  constructor() {}

  changesocketid(uid: string){
    this.socket.emit("changesocketid",{uid:uid});
  }

  addusertogroup(userids:string[],groupid){
    console.log(userids);
    this.socket.emit('addusertogroup',{uids:userids, groupid:groupid});
  }

  useraddedtonewgroup(){
    const observable=new Observable<{userids: string[],group:Group}>(observer => {
      this.socket.on('useraddedtonewgroup', (data) =>{
        observer.next(data);
      });
      return () =>{
        this.socket.disconnect();
      }
    });
    return observable;
  }

  addnewfolder(grp: Group, folder:Folder){
    const data={
      group: grp,
      folder: {
        name: folder.name,
        description: folder.description,
        id: folder.id,
        posts: folder.posts
      }
    }
    console.log(data);
    this.socket.emit('addnewfolder',data);
  }

  addnewpost(group: Group, post: Post, folder: Folder){
    var i: any;
    for(i in group.folders){
      if(group.folders[i].id==folder.id){
        group.folders[i].posts.push(post);
      }
    }
    const data={
      group: group,
      post:post,
      folder: folder
    }
    console.log(data);
    this.socket.emit('addnewpost',data);
  }

  newfolderadded(){
    const observable=new Observable<{group: Group, folder: Folder}>(observer => {
      this.socket.on('newfolderadded', (data) =>{
        observer.next(data);
      });
      return () =>{
        this.socket.disconnect();
      }
    });
    return observable; 
  }

  newpostadded(){
    const observable=new Observable<{group: Group, folder: Folder, post:Post}>(observer => {
      this.socket.on('newpostadded', (data) =>{
        observer.next(data);
      });
    });
    return observable; 
  }

  joingroup(grp: Group){
    // console.log(grp);
    console.log(this.socket.id)
    const data = {
      _id: grp._id,
      users: grp.users,
      folders: grp.folders,
      description: grp.description,
      creator: grp.creator,
      name: grp.name
    }
    this.socket.emit('joingroup',data);
  }

  joinfolder(grpid,folder:Folder){
    const data={
      room: grpid+folder.id,
      folder: {
        name: folder.name,
        description: folder.description,
        id: folder.id,
        posts: folder.posts
      }
    }
    // console.log(data);
    this.socket.emit('joinfolder',data);
  }

}
