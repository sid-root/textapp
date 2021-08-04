import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private bs: BackendService, private route: ActivatedRoute) { }

  password1="";
  password2="";
  token:any;

  submit(){
    console.log(this.bs.token);
    this.bs.resetpassword(this.password1, this.token).subscribe((data)=>{
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
  }

}
