import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PyamentDetilModalComponent } from './payment-verfication/pyament-detil-modal/pyament-detil-modal.component';
import { ChoosePaymentComponent } from './choose-payment/choose-payment.component';
import { ForgetMembershipComponent } from './membership-login/forget-membership/forget-membership.component';

@NgModule({
  declarations: [CompleteProfileComponent, PyamentDetilModalComponent, ChoosePaymentComponent, ForgetMembershipComponent],
  imports: [CommonModule, AuthenticationRoutingModule, InputMaskModule, ReactiveFormsModule, FormsModule]
})
export class AuthenticationModule {}
