import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Post,Folder,Group,User } from '../classes/reqclasses';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  } from 'otp-generator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private ss: BackendService, private router: Router, private formbuilder: FormBuilder) { }

  valid: boolean = true;
  submitted: boolean = false;
  user_id: string;
  password: string;
  accs: User[] = [];
  acc: User;
  form: FormGroup;
  otpauth: boolean = true;
  emailvalid: boolean=true;

  check(){
    this.submitted=true;
    var acc: any;
    var href = this.router.url;
    for (let acc of this.accs){
      if(acc.email==this.form.get('email').value){
        this.router.navigateByUrl(href);
        this.valid = false;
        console.log('Wowowowow');
        break;
      }
      if (acc.id == this.form.get('user_id').value){
        this.router.navigateByUrl(href);
        this.valid = false;
        console.log('Wowowowow');
        break;
      }
    }

    if(this.form.get('otp').value != localStorage.getItem(this.form.get('user_id').value+' otp')){
      this.router.navigateByUrl(href);
      this.otpauth=false;
    }

    else{
      localStorage.removeItem(this.form.get('user_id').value+' otp');
      console.log(localStorage);
    }

    if(this.valid && this.form.valid && this.otpauth){
    this.addaccount();
    localStorage.removeItem(this.form.get('user_id').value + ' otp');
    this.router.navigate(['/login']);
    } 
  }

  sendotp(){
    var acc: User;
    var href=this.router.url;
    var uid: string=this.form.get('user_id').value;
    var email: string=this.form.get('email').value;
    
    for(let acc of this.accs){
      if(acc.email==this.form.get('email').value){
        this.router.navigateByUrl(href);
        this.emailvalid=false;
        this.form.controls['user_id'].setValue(uid);
        this.form.controls['email'].setValue(email);
        return;
      }
    }

    if(this.form.get('email').value){
      var otp = Math.floor(100000 + Math.random() * 900000);
      // console.log(otp);
      var _otp=String(otp);
      localStorage.setItem(this.form.get('user_id').value + ' otp',_otp);
      this.ss.sendotp(_otp, this.form.get('email').value).subscribe(res => {
        console.log(res);
      });
    }
  }
  
  addaccount(){
    var acc = {
      id: this.form.get('user_id').value,
      password: this.form.get('password').value,
      groups: [],
      email: this.form.get('email').value,
      resetlink:""
    };
    this.ss.addaccount(acc).subscribe();
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      user_id: ['', Validators.required],
      password: ['',Validators.required],
      email:['',Validators.required],
      otp: ['',Validators.required]
  });
  this.ss.getaccounts().subscribe(acs => this.accs = acs);
  }
}

