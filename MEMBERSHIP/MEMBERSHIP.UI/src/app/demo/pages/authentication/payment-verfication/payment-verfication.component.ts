import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';
import { PaymentService } from 'src/app/services/payment.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-verfication',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './payment-verfication.component.html',
  styleUrls: ['./payment-verfication.component.scss']
})
export default class PaymentVerficationComponent implements OnInit {
  txt_rn: string;
  baseUrl = environment.clienUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    this.txt_rn = snapshot.paramMap.get('txt_rn');
    // Use the id value as needed
    console.log(this.txt_rn);
    this.verifyPayment();
  }

  verifyPayment() {
    this.paymentService.verifyPayment(this.txt_rn).subscribe({
      next: (res) => {
        console.log(res);
        if (res.response) {
          if (res.response.status == 'success') {
            this.MakePaymentConfirmation();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.response.status });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'success', summary: 'Successfull', detail: err });
      }
    });
  }

  MakePaymentConfirmation() {
    this.paymentService.MakePaymentConfirmation(this.txt_rn).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Your Payment was successfull' });

        window.location.href = this.baseUrl;
      }
    });
  }
}
