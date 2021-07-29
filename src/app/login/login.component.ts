import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User,Post,Folder,Group } from '../classes/reqclasses'
import { WebsocketService } from '../websocket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BackendService]
})
export class LoginComponent implements OnInit {

  constructor(private ss: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    // private ws: WebsocketService
    ) { }


  correct: boolean = true;
  submitted: boolean = false;
  accs: User[] = [];
  user_id: string;
  form: FormGroup;
  password: string;
  acc: User;

  check(){
    this.submitted = true;
    this.ss.checkaccount(this.form.get('user_id').value, this.form.get('password').value).subscribe(account => {this.acc = account
    if(!account){
      this.correct = false;
      var href = this.router.url;
      this.router.navigateByUrl(href);
    }
    else{
      localStorage.setItem('token', 'Loggedin');
      this.router.navigate(["/home", this.form.get('user_id').value]);
    }
    });
    console.log(this.form.get('user_id').value);
  }

  ngOnInit(): void {
    // this.ss.getaccount().subscribe(accounts => {this.accs = accounts});
    this.ss.currentuser_id.subscribe(uid => {this.user_id = uid});
    this.form = this.formbuilder.group({
      user_id: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

}
