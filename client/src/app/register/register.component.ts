import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter;

  model : any = {}; //Create an object named model and set its type to any and initialize it to empty object

  constructor(private accountService : AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  //In this method we will call the register observable which is present in the account service,
  //To this observable we will pass the model data which we will get from the register form
  //This observable will take this data call the api - account/register and register the user, it will
  //Also add the response from the api into the local storage hence completing the register + login process at one go.
  //We dont want to actually use the response from the register observable, just that if it completes sucessfully we want to cancel the RegisterMode so that the registeration from closes
  register(){
    this.accountService.register(this.model).subscribe(
      {
        next : () => {
          this.cancel();
        },
        error : (error)=> {
          console.log(error);
          this.toastr.error(error.error);
        }
      }
    )
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
