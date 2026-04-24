import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserView } from '../../model/user';
import { UserService } from '../../services/user.service';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  loginForm !: FormGroup
  user!: UserView
  showPassword = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, 
    @Inject(DOCUMENT) private document: Document,
  private messageService : MessageService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      userName: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });        
            sessionStorage.setItem('token', res.data);
            this.document.body.classList.remove('toggle-sidebar');
            const user = this.userService.getCurrentUser();
            console.log(user);
            debugger;
            if(user.userType == "ADMIN"){
              this.router.navigateByUrl('/');
            }
           else if(user.userType == "MONITORING"){
              this.router.navigateByUrl('/');
            }
             else if(user.userType == "PERFORMANCE"){
              this.router.navigateByUrl('/');
            }
            else if(user.userType == "HUMANRESOURCE"){
              this.router.navigateByUrl('/HRM/dashboard');
            }
             else if(user.userType == "INVENTORY"){
              this.router.navigateByUrl('/inventory/dashboard');
            }
             else if(user.userType == "FINANCE"){
              this.router.navigateByUrl('/finance/dashboard');
            }

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });  
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error.', detail: err.message });  
        }
      })
    }
  }

}
