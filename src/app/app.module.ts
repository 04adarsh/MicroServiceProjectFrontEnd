import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AdminDashboardComponent } from './admin-panel/admin-dashboard/admin-dashboard.component';
import { AdminpanelNavbarComponent } from './admin-panel/adminpanel-navbar/adminpanel-navbar.component';
import { ProductComponent } from './admin-panel/product/product.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { CategoryComponent } from './admin-panel/category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    AdminDashboardComponent,
    AdminpanelNavbarComponent,
    ProductComponent,
    UsersComponent,
    CategoryComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
