import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddgroupdialogComponent } from './addgroupdialog/addgroupdialog.component';
import { Group, Folder, User } from '../classes/reqclasses';
import { BackendService } from '../backend.service';
import { ActivatedRoute,Router } from '@angular/router';
import { from } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userid: string;
  currentuser:User;
  groups: Group[]=[];
  srch:string="";
  short_name="";
  sgroups: Group[]=[];
  currgrp:Group;
  currgrpfols1: Folder[] = [];
  currgrpfols2: Folder[] = [];


  constructor(public bs: BackendService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private ws: WebsocketService) {
    this.ws.newfolderadded().subscribe(data => {
      console.log("Checking web socket newfolderadded");
      console.log(data);
      var i:any;
      for(i in this.groups){
        if(this.groups[i]._id==data.group._id){
          this.groups[i].folders.push(data.folder);
          this.ws.joinfolder(this.groups[i]._id,data.folder);
          if(this.currgrp){
            if(this.currgrp._id==data.group._id){
              this.currgrp=this.groups[i];
              console.log(this.currgrp);
            }
          }
        }
      }
    });
    this.ws.newpostadded().subscribe(data => {
      console.log(data);
      var j: any;
      for(j in this.groups){
        if(this.groups[j]._id==data.group._id){
          var k: any
          this.groups[j].folders=data.group.folders;
        }
        if(this.currgrp){
          if(this.currgrp._id==data.group._id){
            this.currgrp.folders=data.group.folders;
          }
        }
      }
    });
    this.ws.useraddedtonewgroup().subscribe(res => {
      console.log(res);
      var i:any;
      if(this.currgrp){
        if(this.currgrp._id==res.group._id){
        this.currgrp.users=res.group.users;
        this.ws.joingroup(this.currgrp);
        }
      }
      else{
        for(i in res.userids){
          if(res.userids[i]==this.userid){
            this.groups.push(res.group);
            this.ws.joingroup(res.group);
            var j:any;
            for(j in res.group.folders){
              this.ws.joinfolder(res.group._id,res.group.folders[j]);
            }
          }
        }
      }
    })
   }

  editgroup(group:Group){
    
  }

  ls(){
    var sgroup:Group;
    for (sgroup of this.groups){
      if (sgroup.name.indexOf(this.srch)>=0&&this.sgroups.indexOf(sgroup)<0){
        this.sgroups.push(sgroup);
      }
      // this.sgroups.splice(this.sgroups.length-1,1);
     
    }
  }

  search(){
    if (this.srch==""){
      this.bs.search=false;
      var grp:Group;
      this.sgroups=[];
      console.log(this.groups)
    }
    else{
      this.bs.search=true;
      // this.sgroups=this.groups;
      this.sgroups=[];
      console.log(this.sgroups);
      this.ls();
      console.log(this.sgroups);
    }
  }

  clickgroup(grp:Group){
    this.currgrp=grp;
    console.log('Check clickgroup function');
    console.log(this.currgrp);
    var i: any;
    for(i in this.currgrp.folders){
      this.ws.joinfolder(this.currgrp._id, this.currgrp.folders[i]);
      var j: any;
    }

    this.bs.back=false;
    this.bs.gi=false;
    console.log(this.bs.back);
  }

  shorten(grp:Group){
    if (grp.name.length>14){
      this.short_name=grp.name.substring(0,12) + "..."
    }
    else{
      this.short_name=grp.name
    }
    return true;
  }

  addgroup(){
    var grp = new Group();
    const dialogref=this.dialog.open(AddgroupdialogComponent,{data:grp});
    
    dialogref.afterClosed().subscribe(res=>{
      if(grp.name!="")
      {
        this.bs.addgroup(grp).subscribe(grpid => {
          grp._id=grpid;
          console.log("Add Group :", grpid);
          this.ws.addusertogroup([this.userid],grpid);
        });
      }
    });
  }

  ngOnInit(): void {

    this.userid = this.route.snapshot.params['uid'];
    // console.log(this.userid);

    this.bs.getacc(this.userid).subscribe(res => {
      this.currentuser=res[0];
      // console.log(this.currentuser.id);
      var i:any
      for(i in this.currentuser.groups){
        this.bs.getgroups(this.currentuser.groups[i]).subscribe(grp => {
          this.groups.push(grp);
          this.ws.joingroup(grp);
          var k: any;
          for(k in grp.folders){
            this.ws.joinfolder(grp._id,grp.folders[k]);
            // console.log("Joined room(folder): "+grp._id+grp.folders[k].id);
          }
        });
      }
    });
  }
}
