import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //Create property in the class to store the textbox data from the form
  //the var model is of type any and is initialized to empty object
  model: any = {}
  
  //Injecting the newly created service - Account Service
  //make this constructor object public so that we can directly use the account service in the template
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
        }
      }
    )
  }

  logout(){
    this.accountService.logout(); //This will remove the existing data from localstorage and the currentUserSource
  }
}
