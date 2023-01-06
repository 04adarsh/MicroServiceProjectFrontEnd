import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-panel/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './admin-panel/product/product.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './shared/admin.guard';
import { AuthguardGuard } from './shared/authguard.guard';
import { UsersComponent } from './admin-panel/users/users.component';
import { CategoryComponent } from './admin-panel/category/category.component';


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
  },
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent,
    children:[
      
      {
        path:"products",
        component:ProductComponent
      },
      {
        path:"users",
        component: UsersComponent
      },
      {
        path:"categories",
        component:CategoryComponent
      }
    ],
    canActivate:[AdminGuard],

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
