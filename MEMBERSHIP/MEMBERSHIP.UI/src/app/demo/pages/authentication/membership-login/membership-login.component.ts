import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { UserView } from 'src/models/auth/userDto';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetMembershipComponent } from './forget-membership/forget-membership.component';
@Component({
  selector: 'app-membership-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, ButtonModule],
  providers: [],
  templateUrl: './membership-login.component.html',
  styleUrls: ['./membership-login.component.scss']
})
export default class MembershipLoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: UserView;

  membershipId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['1234', Validators.required],
      IsEncryptChecked: [false, Validators.required]
    });

    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    this.membershipId = snapshot.paramMap.get('membershipId');

    if (this.membershipId) {
      this.loginWithMembershipId(this.membershipId);
    }
    
  }

  loginWithMembershipId(membershipId: string) {
    var memberlogin = {
      userName: membershipId,
      password: '1234',
      IsEncryptChecked: false
    };
    this.userService.login(memberlogin).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

          sessionStorage.setItem('token', res.data);
          this.router.navigateByUrl('/member-dashboard');
        } else {
          this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went wron!!!', detail: err.message });
      }
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
          } else {
            this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wron!!!', detail: err.message });
        }
      });
    }
  }
  loginasAdmin() {
    this.router.navigateByUrl('/auth/login');
  }
  register() {
    this.router.navigateByUrl('/auth/register');
  }

  forgetPassword() {
    let modalRef = this.modalService.open(ForgetMembershipComponent, { size: 'xl', backdrop: 'static' });
  }
}
