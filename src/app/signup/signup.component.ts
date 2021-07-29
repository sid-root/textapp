import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Post,Folder,Group,User } from '../classes/reqclasses';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  check(){
    this.submitted=true;
    var acc: any;
    for (let acc of this.accs){
      if (acc.id == this.form.get('user_id').value){
        var href = this.router.url;
        this.router.navigateByUrl(href);
        this.valid = false;
        console.log('Wowowowow');
        break;
      }
    }
    if(this.valid && this.form.valid){
    this.addaccount();
    this.router.navigate(['/home', this.form.get('user_id').value]);
    } 
  }
  
  addaccount(){
    var acc = {
      id: this.form.get('user_id').value,
      password: this.form.get('password').value,
      groups: []
    };
    this.ss.addaccount(acc).subscribe();
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      user_id: ['', Validators.required],
      password: ['',Validators.required]    
  });
  this.ss.getaccounts().subscribe(acs => this.accs = acs);
  }
}

