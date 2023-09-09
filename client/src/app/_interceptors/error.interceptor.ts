import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route : Router, 
    private toastr : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //This interceptor will handle incoming response to the Angular application,
    //Since this next.handle is an observable, we will use the pipe function to add logic to it
    return next.handle(request).pipe(
      //Catch Error is an internal function in HttpHandler
      catchError((error: HttpErrorResponse) => {
        if(error){
          switch (error.status){
            case 400:
              //In case of error code 400, it can be caused either due to validation error (like id and password) or due to bad request, if it is validation error, the error codes are inside error object and inside it is errors array
              if(error.error.errors){
                const modelStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    //Store the errors in modelStateErrors array so that it is easier for applicaiton to read
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              }else{
                //This is for bad request
                this.toastr.error(error.error,error.status.toString());
              }
              break;

            case 401:
              this.toastr.error('Unauthorized', error.status.toString());
              break;

            case 500:
              //Since this is an internal server error we will there is no formal way of handling the error, we will redirect the user to new page called server-error. On this page we will show the internal server error. in order to pass this error state from this interceptor to the page which is being called we will use navigation extras
              const navigationExtras: NavigationExtras = {state:{ error : error.error}};
              this.route.navigateByUrl('/server-error',navigationExtras);
              break;

            case 404:
              this.route.navigateByUrl('/not-found');
              break;
            
            default :
            this.toastr.error('Something unexpected went wrong');
            console.log(error);
          }
        }

        //At the end this catchError function requires that we throw back the error.
        throw error;
      })
    );
  }
}
