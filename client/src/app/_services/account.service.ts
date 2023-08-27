import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root' //This means this service is injected into the root module (which is app.component.ts)
})
export class AccountService {
  baseUrl ="https://localhost:5001/api/"; //The base url of the API which will be hit

  //We are creating a new behaviourSubject which is a special type of observable
  //We are setting initial value to be null but it will throw error if we keep the type as only <User> since null cannot be mapped to User type. Hence using pipe operator we specify that the type of the behaviour subject can be either User or Null.
  //This will tell any component who subscribes to this if user details are present in localStorage
  private currentUserSource = new BehaviorSubject<User | null>(null);

  //This is a public variable which will allow other components to subscribe to our Behaviour Subject
  currentUser$ = this.currentUserSource.asObservable();

  //Injecting the HttpClient service into the CTOR
  constructor(private http : HttpClient) { }

  //This method will take input of type model and call the api endpoint and pass the data in the body
  login(model : any)
  {
    //when this service is injected into the nav component, it will return a observable to which we must be subscribed
    //Add on pipe at the end of the observable since we want to manipulate the data before it is consumed by the template
    //By using post<User> we are specifying what will be the data received into the post method
    //This will allow the response to be mapped to User as well
    return this.http.post<User>(this.baseUrl + "account/login",model).pipe(
      //We are using the RxJS map function to perform action on the response we will be getting from api
      map((response : User) => {
        const user = response;
        if(user){
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user); //Since currentUserSource is fundamentally an observable we need to store data into it using .next()
        }
      })
    ) 
  }

  //This method will be usable outside of the service in other compoents, this will allow the other components to set user value to currentUserSource which will then be taken by the service and stored in the currentUserSource Behaviour Subject which will then can be queried by other components
  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  register(model : any){
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map(user =>{
          if(user){
            localStorage.setItem("user",JSON.stringify(user));
            this.currentUserSource.next(user); //The user which is registering is also being considered logged in hence we store their data in the local storage as well as the currentUserSource so that anyone who suscribes to the observable currentUserSource can get the same value.
          }
        }
      )
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
