import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from 'src/app/backend.service';
import { Group,Folder,Post,User } from 'src/app/classes/reqclasses';

@Component({
  selector: 'app-group-info-dialog',
  templateUrl: './group-info-dialog.component.html',
  styleUrls: ['./group-info-dialog.component.css']
})
export class GroupInfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{userstobeadded: string[],nongroupusers:string[]},public dialogref: MatDialogRef<GroupInfoDialogComponent>, private bs: BackendService) { 
    dialogref.disableClose=true;
  }

  cancel(){
    this.data.userstobeadded=[];
  }

  dojob(){
    this.dialogref.close(this.data.userstobeadded);
  }

  check(){
    
    return true;
  }

  ngOnInit(): void {
    
  }

}
