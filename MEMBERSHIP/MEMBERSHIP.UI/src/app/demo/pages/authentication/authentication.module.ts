import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
  
    CompleteProfileComponent,
            
  ],
  imports: [CommonModule, AuthenticationRoutingModule,InputMaskModule,ReactiveFormsModule],
})
export class AuthenticationModule {}
