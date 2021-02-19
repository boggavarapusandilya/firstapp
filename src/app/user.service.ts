import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http'
import {Observable} from'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
//inject httpclient obj
  constructor(private hc:HttpClient) { }


  createUser(userObj:any):Observable<any>{
    
    return this.hc.post("/user/register",userObj)
  
  }
  loginUser(userCredObj:any):Observable<any>{
    return this.hc.post("/user/login",userCredObj)
  }
  getUser(username:any):Observable<any>{
    return this.hc.get("/user/getuser/"+username)
  }

}