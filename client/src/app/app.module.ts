import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' //Importing HttpClient Module From Angular

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


@NgModule({ //Declaration For Module
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent //Declaring that the app Component needs to be loaded
  ],
  imports: [ //Imports which are needed by the angular applicaiton to function
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Adding HttpClient Module
    FormsModule, //Import the Angular Forms Module
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent] //This module is responsible for bootstraping the AppComponent
})
export class AppModule { }
