import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_services/auth-guard.service';
import {CreatorComponent} from "./creator/creator.component";
import {FiltersComponent} from "./filters/filters.component";
import { RecentComponent } from './recent/recent.component';

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}, {path: 'create/:date', component: CreatorComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent }, {path: 'popular', component: FiltersComponent, canActivate: [AuthGuard]},
  {path: 'recent', component: RecentComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
