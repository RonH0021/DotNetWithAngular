import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' //Importing HttpClient Module From Angular

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({ //Declaration For Module
  declarations: [
    AppComponent //Declaring that the app Component needs to be loaded
  ],
  imports: [ //Imports which are needed by the angular applicaiton to function
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //Adding HttpClient Module
  ],
  providers: [],
  bootstrap: [AppComponent] //This module is responsible for bootstraping the AppComponent
})
export class AppModule { }
