import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  constructor(private http : HttpClient) {}
  
  //This on Init method will be executed after the constructor is run 
  ngOnInit(): void {
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
}
