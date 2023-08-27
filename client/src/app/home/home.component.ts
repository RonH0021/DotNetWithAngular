import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Tracks if user has clicked on the register button or not
  registerMode = false;
  users : any;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    //If we want to use a property which is in a class then we have to use 'this.'
    //In this case 'http' is a property
    //The http.get will - @return — An Observable of the response body as a JavaScript object.
    //This observable is lazyloading, that means we have to subscribe to the return of the get method
    //In order to actually use it
    this.http.get("https://localhost:5001/api/users").subscribe( {
      next: response => this.users = response, //What to do when response is received. 
      //Using call back function (used in all 3)
      error : error => console.log(error), //What to do if error is received
      complete: () => console.log("Request sucessfully completed") //what to do at the end of the processing
    })
  }

  registerToggle(){
    //Toggles the registerMode flag when user clicks on the register button
    this.registerMode = !this.registerMode;
  }

  //This method will take the data from the child component - register
  //And use it to flip the set the registerMode flag to false
  //The input to this method is the event which was emitted by the child component
  cancelRegisterMode(event : boolean){
    this.registerMode = event;
  }
}
