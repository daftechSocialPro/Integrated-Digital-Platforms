import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import {ButtonModule} from 'primeng/button'
import { UserView } from 'src/models/auth/userDto';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-membership-login',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule,HttpClientModule,ButtonModule],
  providers:[],
  templateUrl: './membership-login.component.html',
  styleUrls: ['./membership-login.component.scss']
})
export default class MembershipLoginComponent implements OnInit {

  loginForm !: FormGroup
  user!: UserView
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private userService: UserService, 
    
  private messageService : MessageService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      userName: ['', Validators.required],
      password: ['1234', Validators.required],
      IsEncryptChecked:[false,Validators.required]

    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
          
            sessionStorage.setItem('token', res.data);
            this.router.navigateByUrl('/member-dashboard');
          }
          else {

            this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });
           
          }

        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wron!!!', detail: err.message });              
         

        }
      })
    }
  }
  loginasAdmin(){
    this.router.navigateByUrl('/auth/login');
  }
  register (){
    this.router.navigateByUrl('/auth/register');
  }
}
