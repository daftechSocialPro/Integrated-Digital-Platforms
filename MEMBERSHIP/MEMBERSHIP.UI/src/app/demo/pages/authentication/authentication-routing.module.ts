import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import MembershipLoginComponent from './membership-login/membership-login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component')
      },
      {
        path: 'complete-profile',
        component: CompleteProfileComponent
      },
      { path: 'membership-login', component: MembershipLoginComponent },
      { path: 'membership-login/:membershipId', component: MembershipLoginComponent },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component')
      },
      {
        path: 'payment-verfication/:txt_rn',
        loadComponent: () => import('./payment-verfication/payment-verfication.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
