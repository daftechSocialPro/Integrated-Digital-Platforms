import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(
    private spinnerService: SpinnerService, 
    private cdRef: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.init();
   
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

  isAuthPage(): boolean {
    const authPages = ['/pages-register', '/pages-login', '/pages-error404', '/forgetPassword'];
    return authPages.includes(this.router.url) || 
           this.router.url.startsWith('/trainee-form') || 
           this.router.url.startsWith('/vaccancy') || 
           this.router.url.startsWith('/vacancy-form') || 
           this.router.url.startsWith('/applicant-form');
  }

}