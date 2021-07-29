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
    return this.http.get<User>('http://localhost:3000/api/accs/'+uid);
  }

  addaccount(user:User): Observable<User>{
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

  addpost(gid:string, folid:string, post:Post){
    return this.http.put('http://localhost:3000/api/addpost/'+gid+'/'+folid, post);
  }

  addfolder(gid:string, folder:Folder){
    return this.http.put('http://localhost:3000/api/addfol/'+gid+'/'+folder.id,folder);
  }

  getgroups(gid:string): Observable<Group>{
    return this.http.get<Group>('http://localhost:3000/api/group/'+gid).pipe();
  }

  getgroupsfromuserid(uid:string){
    this.http.get<Group[]>('http://localhost:3000/api/groupsbyuser/'+uid).pipe();
  }

  addfolder2( grp:Group): Observable<Group>{
    return this.http.put<Group>('http://localhost:3000/api/addfol2',grp).pipe();
  }

  updategrparray(user: User,group: Group){
    return this.http.put('http://localhost:3000/api/updategrparray/'+user.id, {user:user,group:group});
  }

  // getgroups2

}
