import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  //Inject the account service and Toastr Service into the guard
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  //call the currentUser$ observable and use the pipe function to check if the user is present or not
  //If user is present then return true if not then throw toastr error
  return accountService.currentUser$.pipe(
    map(user => {
      if(user) return true;
      else {
        toastr.error('You shall Not Pass !!');
        return false;
      }
    })
  )
};
