import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User,Folder,Group,Post } from './classes/reqclasses';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public back:boolean=false;
  public search:boolean=false;
  public gi:boolean=false;

  constructor(private http: HttpClient) { }

  private user_id = new BehaviorSubject('Basic Approval is required!');
  private password = new BehaviorSubject('Basic Approval is required!');

  currentuser_id = this.user_id.asObservable();
  currentpassword = this.password.asObservable();
  serveradr='http://localhost:3000/api/';
  visit_reset_pass= true;
  token: any;

  update_user_id(message: string) {
    this.user_id.next(message)
  }

  update_password(message: string) {
    this.password.next(message)
  }

  getaccounts(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/api/users').pipe();
  }

  getaccount(uid:string, password: string): Observable<User>{
    return this.http.get<User>('http://localhost:3000/api/accounts/'+uid+'/'+password)
  }

  getacc(uid:string): Observable<User>{
    return this.http.get<User>('http://localhost:3000/api/accs/'+uid).pipe();
  }

  addaccount(user:User): Observable<User>{
    console.log("addaccount called in backend service");
    return this.http.post<User>('http://localhost:3000/api/sign_in', user).pipe();
  }

  checkaccount(user_id:string,password:string): Observable<User>{
    return this.http.get<User>('http://localhost:3000/api/accounts/'+ user_id + '/' + password).pipe();    
  }

  addgroup(group:Group){
    var grpid=this.http.post<string>('http://localhost:3000/api/addgrp',group);
    console.log("Check addgroup in backend service ", grpid)
    return grpid;
  }

  getgroups(gid:string): Observable<Group>{
    return this.http.get<Group>('http://localhost:3000/api/group/'+gid).pipe();
  }

  getgroupsfromuserid(uid:string){
    this.http.get<Group[]>('http://localhost:3000/api/groupsbyuser/'+uid).pipe();
  }

  sendotp(otp: string, email: string){
    return this.http.post('http://localhost:3000/api/sendotp', {otp: otp, email: email}).pipe();
  }

  forgotpassword(email: string, url: string){
    return this.http.put(this.serveradr+"forgotpassword",{email: email, url: url}).pipe();
  }

  resetpassword(newpassword, token){
    return this.http.put(this.serveradr+"resetpassword",{token: token, newpassword: newpassword}).pipe();
  }

  authenticate(userid: string, email:string){
    return this.http.post<{message: string}>(this.serveradr + "authenticate", {userid: userid, email: email}).pipe();
  }

}
