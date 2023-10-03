import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService : AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //Take 1 will automatically unsubscribe after value is extracted
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      {
        next: user => {
          if(user)
          {
            //create a clone of the request, add token header to it, and replace the original request with this new one so that the request is sent out with the token
            request = request.clone({
              setHeaders :{
                Authorization : `Bearer ${user.token}`
              }
            })
          }
        }
      }
    )
    return next.handle(request);
  }
}
