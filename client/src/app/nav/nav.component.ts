import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  //Injecting the router service so that we can route users based on action
  constructor(public accountService: AccountService,
     private router : Router,
     private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: () => {
          this.router.navigateByUrl('/members'); //If log in is sucessfull then navigate user to members page
        }
      }
    )
  }

  logout(){
    this.accountService.logout(); //This will remove the existing data from localstorage and the currentUserSource
    this.router.navigateByUrl('/'); //Once user has logged out navigate them to the homepage
  }
}
