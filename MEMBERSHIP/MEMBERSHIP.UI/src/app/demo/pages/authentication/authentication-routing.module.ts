import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component')
      },
      {
        path: 'membership-login',
        loadComponent: () => import('./membership-login/membership-login.component')
      },
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
