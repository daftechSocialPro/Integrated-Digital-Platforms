import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PyamentDetilModalComponent } from './payment-verfication/pyament-detil-modal/pyament-detil-modal.component';


@NgModule({
  declarations: [
    
  
    CompleteProfileComponent,
            PyamentDetilModalComponent,
            
  ],
  imports: [CommonModule, AuthenticationRoutingModule,InputMaskModule,ReactiveFormsModule],
})
export class AuthenticationModule {}
