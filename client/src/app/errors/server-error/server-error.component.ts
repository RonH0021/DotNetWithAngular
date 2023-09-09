import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {

  error : any;

  constructor(private router: Router) {
    //We will get the navigation from our router
    const navigation = router.getCurrentNavigation();
    //From the navigation,we will extract extras (since we had passed values in NavigationExtras in our interceptor),and we will extract the state and in it will be 'error' (this is the name specified in our interceptor)
    //We are using ? since the type of error object in this component is also any
    this.error = navigation?.extras?.state?.['error'];
  }
}
