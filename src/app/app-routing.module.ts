import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardGuard } from './shared/authguard.guard';


const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:HomeComponent
  },
  {
    path:"register",
    pathMatch:"full",
    component:RegisterComponent
  },
  {
    path:"login",
    pathMatch:"full",
    component:LoginComponent
  },
  {
    path:"dashboard",
    pathMatch:"full",
    component:DashboardComponent,
    canActivate:[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
