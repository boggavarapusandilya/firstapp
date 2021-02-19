import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import{ReactiveFormsModule}from '@angular/forms'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserprofileupdateComponent } from './userprofileupdate/userprofileupdate.component';
import{AuthorizationService} from'./authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactusComponent,
    UserdashboardComponent,
    UserprofileComponent,
    UserprofileupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ { provide:HTTP_INTERCEPTORS, 
    useClass:AuthorizationService, 
    multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
