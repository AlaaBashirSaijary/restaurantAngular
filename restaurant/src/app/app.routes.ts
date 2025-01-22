import { Routes } from '@angular/router';
import { KnowmoreComponent } from './knowmore/knowmore.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponsePasswordComponent } from './response-password/response-password.component';
import { BeforeLoginService } from './Servises/before-login.service';
import { AfterLoginService } from './Servises/after-login.service';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ErrorComponent } from './error/error.component';
import { PaymatPageComponent } from './paymat-page/paymat-page.component';

export const routes: Routes = [
    {
        path:'',component:KnowmoreComponent

    },
    {
      path:'home',component:HomeComponent

  },
    {
      path:'dashboard',component:DashboardComponent,  canActivate:[AfterLoginService]


  },
  {
        path:'ResetPassword',
        component:RequestResetComponent,
        canActivate:[BeforeLoginService]


    },
    {
      path:'responce-Password',
      component:ResponsePasswordComponent,
      canActivate:[BeforeLoginService]


  },
    {
      path:'',
redirectTo:'KnowMore' ,
pathMatch:'full'   },
{
  path:'login',
  component:LoginComponent,
  canActivate:[BeforeLoginService]

},
{
  path:'signup',
  component:SignupComponent,
},
{
  path:'search/:searchTerm',
  component:HomeComponent
},
{
  path:'tag/:tag',
  component:HomeComponent
},
{
  path:'food/:id',
  component:FoodPageComponent
},
{
  path:'cart',
  component:CartPageComponent
},
{
  path:'checkOut',
  component:CheckOutComponent,
 // canActivate:[AfterLoginService]

},
{
  path:'Error',
  component:ErrorComponent,
  canActivate:[AfterLoginService]
},
{
  path:'payment',
  component:PaymatPageComponent,
  canActivate:[AfterLoginService]
},


];
