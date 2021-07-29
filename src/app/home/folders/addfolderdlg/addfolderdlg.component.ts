import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Folder } from '../../../classes/reqclasses';

@Component({
  selector: 'app-addfolderdlg',
  templateUrl: './addfolderdlg.component.html',
  styleUrls: ['./addfolderdlg.component.css']
})
export class AddfolderdlgComponent implements OnInit {

  fol:Folder;
  name: string;
  descr:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogref: MatDialogRef<AddfolderdlgComponent>) { 
    this.fol=data;
    dialogref.disableClose=true;
  }

  check(){
    if(this.fol.name!=""){
      return true;
    }
    return false;
  }

  cancel(){
    this.fol.name="";
  }

  ngOnInit(): void {
  }


}
