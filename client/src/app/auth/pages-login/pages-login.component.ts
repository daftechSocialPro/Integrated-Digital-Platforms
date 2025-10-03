import { Component, OnInit } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, 
    
  private messageService : MessageService) { }

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
              debugger;
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });        
            sessionStorage.setItem('token', res.data);
            this.router.navigateByUrl('/');
          }
          else {

            this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });
           
          }

        },
        error: (err) => {

    

        }
      })
    }
  }

}
