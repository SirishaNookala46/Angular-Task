import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUserComponent } from './view-users/view-users.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login';
import { AuthGuard } from './helpers';


const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: ViewUserComponent,  canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },

  { path: '**', component : ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







