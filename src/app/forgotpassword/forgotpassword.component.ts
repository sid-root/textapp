import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private bs: BackendService) { }

  email: string;
  url="localhost:4200";

  submit(){
    // this.bs.visit_reset_pass=true;
    this.bs.forgotpassword(this.email,this.url).subscribe(token =>{
      this.bs.token=token;
      console.log(this.bs.token);
    });
  }

  ngOnInit(): void {
  }

}
