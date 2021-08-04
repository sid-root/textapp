import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddfolderdlgComponent } from './addfolderdlg/addfolderdlg.component';
import { Folder, Group, Post, User } from '../../classes/reqclasses';
import { BackendService } from '../../backend.service';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  @Input() Grp: Group=new Group();
  @Input() uid: string;
  posts: Post[]=[];
  i: number;
  post= new Post();
  folders=this.Grp.folders
  selFolder:boolean

  addfolder(){
    var folder=new Folder();
    const dialogref=this.dialog.open(AddfolderdlgComponent,{data:folder});

    dialogref.afterClosed().subscribe(res=>{
      if(folder.name!="")
      {
        console.log('Check addfolder function after dialog close');
        console.log(this.Grp);
        console.log(res);
        var len=this.Grp.folders.length+1;
        console.log("Length of Folders array for currgrp ",len);
        folder.id=len.toString();
        console.log(this.folders);
        this.ws.addnewfolder(this.Grp,folder);
        this.ws.joinfolder(this.Grp._id,folder);
      }
    });
  }

  addpost(){
    if(this.post.text!=""){
      this.post.userid = this.uid;
      console.log(this.post)
      console.log("Check addpost function after pushing", this.Grp.folders[this.i-1])
      this.ws.addnewpost(this.Grp,this.post,this.Grp.folders[this.i-1]);
      this.post=new Post();
    }
  }

  clickfolder(fol:Folder){
    this.bs.back=true;
    this.i = +fol.id;
    this.selFolder=true 
    this.posts=fol.posts;
  }

  constructor(private dialog:MatDialog, public bs: BackendService, private ws: WebsocketService) {
  }

  ngOnInit(): void {    
  }

}