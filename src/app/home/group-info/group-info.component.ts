import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { WebsocketService } from 'src/app/websocket.service';
import { Group, Folder,Post,User } from '../../classes/reqclasses';
import { MatDialog } from '@angular/material/dialog';
import { GroupInfoDialogComponent } from './group-info-dialog/group-info-dialog.component';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {

  @Input() group: Group;
  
  constructor(public bs : BackendService, private ws: WebsocketService, private dialog:MatDialog) { 
    this.ws.useraddedtonewgroup().subscribe(res =>{
      if(this.group){
        if(this.group._id==res.group._id){
          this.group=res.group;
        }
      }
    });
  }

  adduser(){
    var userstobeadded: any[] = [];
    var _users: User[]=[];
    var nongroupusers: any[]=[];
    this.bs.getaccounts().subscribe( accs =>{
      _users=accs;
      var i:any;
      for(i in _users){
        var j:any
        var count=0;
        for(j in this.group.users){
          
          if(this.group.users[j]==_users[i].id){
            break;
          }
          count++;
        }
        if(count==this.group.users.length){
          nongroupusers.push(_users[i].id);
        }
      }

      console.log(nongroupusers);

      const dialogref=this.dialog.open(GroupInfoDialogComponent,{
        data:{
        userstobeadded:userstobeadded,
        nongroupusers:nongroupusers
        },
        height:'auto',
        width:"35%",
        maxHeight:"80%",
      });

      dialogref.afterClosed().subscribe(res => {
        var i:any;
        console.log(res);
        if(res){
          console.log("Check Add User");
          this.ws.addusertogroup(res,this.group._id);
        }
      });
    });
  }

  ngOnInit(): void {
    
  }

}
