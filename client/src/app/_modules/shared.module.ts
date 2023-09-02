import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  //What are the 3rd party modules which will be used in this shared.module and what are their configurations
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'})
  ],
  //When app.module references this shared.module, what modules should the shared.module export to app.module.
  //Here we just need name of module not the configuration
  exports:[
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
