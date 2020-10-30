import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ViewUserComponent } from './view-users/view-users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { ModalModule } from 'ngx-bootstrap/modal'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';




// used to create fake backend
import { fakeBackendProvider } from './helpers';


import { BasicAuthInterceptor, ErrorInterceptor } from './helpers';
// import { HomeComponent } from './home';
import { LoginComponent } from './login';



@NgModule({
  declarations: [
    AppComponent,
    ViewUserComponent,
    ErrorComponent,
    NewUserComponent,
    LoginComponent
  
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
