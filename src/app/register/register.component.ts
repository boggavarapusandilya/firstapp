import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import{Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
//for uploading file;
  file!:File; 

  incomingfile(event:any) { 
    this.file= event.target.files[0];
   }

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
 onSubmit(formRef:any){
  let userObj=formRef.value; 
  let formData=new FormData(); //adding image and other data to FormData object 
  formData.append('photo',this.file,this.file.name); 
  formData.append("userObj",JSON.stringify(userObj))
  

   console.log(userObj);

   this.us.createUser(formData).subscribe(
     res=>{
       if(res["message"]=="user existed"){
         alert("username is already taken..chose another")
          formRef.clear()
       }
       if(res["message"]=="user created"){
         alert("registration success");
         //navigate to login component
         this.router.navigateByUrl("/login");
        
       }

     },
     err=>{
       alert("something went wrong in user creation");
       console.log(err)
     }
   )
   console.log(formRef.value)
 }
}
