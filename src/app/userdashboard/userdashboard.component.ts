import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
   
   userObj:any;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    let username=localStorage.getItem("username")
    this.userObj=this.us.getUser(username).subscribe(
      res=>{ 
        if(res["message"]=="success"){
        this.userObj=res["user"] 
        }
        else{
          alert(res["message"])
          //navigate to login page
          this.router.navigateByUrl("/login")
        }
      }, 
      err=>{ 
        alert("Something went wrong") 
        console.log(err)
       }
  ) 
  }
  userLogout(){
    //clear local storage
    localStorage.clear();
    //navigate to home
    this.router.navigateByUrl("/home");
  }

}
