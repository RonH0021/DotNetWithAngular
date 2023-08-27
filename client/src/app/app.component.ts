import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users : any; //This is technically not connect we should not use
  //'any'type, in TypeScript we must always specify type for type safety

  //Constuctor(private {property name} : {what is it importing})
  constructor(private accountService : AccountService) {}
  
  //This on Init method will be executed after the constructor is run 
  ngOnInit(): void {
    this.setCurrentUser();
  }

  //This method is triggred when application first loads, it simply checks if the local storage has any user data, if it does not then it does not do anything. If the localStorage does have existing user data then this method will send this data to the account service which will then set it to Behaviour Subject called currentUserSource, other components can subscribe to this and read the value
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return ;
    const user : User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
