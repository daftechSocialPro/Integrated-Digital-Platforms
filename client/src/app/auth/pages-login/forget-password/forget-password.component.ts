import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPassForm !: FormGroup
  user!: UserView
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, 
  private messageService : MessageService) { }

  ngOnInit(): void {

    this.forgetPassForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ChangePassword() {
    if (this.forgetPassForm.valid) {
      this.userService.forgetPassword(this.forgetPassForm.value.email).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });        
            this.router.navigateByUrl('/');
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Failed.', detail: res.message });
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}