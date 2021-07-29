import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from '../../classes/reqclasses';

@Component({
  selector: 'app-addgroupdialog',
  templateUrl: './addgroupdialog.component.html',
  styleUrls: ['./addgroupdialog.component.css']
})
export class AddgroupdialogComponent implements OnInit {
  grp: Group;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogref: MatDialogRef<AddgroupdialogComponent>) { 
    this.grp=data;
    dialogref.disableClose=true;
  }
  ngOnInit(): void {
  }
  check(){
    if (this.grp.name!=""){
      return true;
    }
    return false;
  }

  cancel(){
    this.grp.name="";
  }
}
