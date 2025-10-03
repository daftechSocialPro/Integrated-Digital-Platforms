import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { PaymentService } from 'src/app/services/payment.service';
import { errorToast, successToast } from 'src/app/services/toast.service';
import { IPaymentData, IMakePayment } from 'src/models/payment/IPaymentDto';

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})
export class ChoosePaymentComponent implements OnInit {
  @Input() payment;
  @Input() data;
  ngOnInit(): void {}

  paymentForm: FormGroup;
  selectedMethod: 'Chapa' | 'Receipt' = 'Chapa';
  receiptImagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private activeModal: NgbActiveModal,
    private messageService: MessageService
  ) {
    this.paymentForm = this.fb.group({
      method: ['Chapa', Validators.required],
      receiptImage: [null]
    });
  }

  onPaymentMethodChange(method: 'Chapa' | 'Receipt') {
    this.selectedMethod = method;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.paymentForm.patchValue({ receiptImage: file });

      // Preview Image
      const reader = new FileReader();
      reader.onload = () => {
        this.receiptImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitPayment() {
    if (this.selectedMethod === 'Chapa') {
      this.proceedToChapa();
    } else {
      this.uploadReceipt();
    }
  }

  proceedToChapa() {
    this.goTOPayment(this.payment, this.data);
  }

  uploadReceipt() {
    const formData = new FormData();
    formData.append('method', 'Receipt');
    if (this.paymentForm.value.receiptImage) {
      formData.append('RecieptImage', this.paymentForm.value.receiptImage);
    }

    formData.append('MemberId', this.data.id);

    if (this.paymentForm.value.receiptImage == null) {
      errorToast('Please Upload the Reciept Image');
      return;
    }

    // Example API call

    this.paymentService.updateMemberPayment(formData).subscribe({
      next: (res) => {
        if (res.success) {
          successToast(res.message);

          this.closeModal();
        } else {
          errorToast(res.message);
        }
      }
    });
  }
  closeModal() {
    this.activeModal.close();
  }

  goTOPayment(payment: IPaymentData, member: any) {
    this.paymentService.payment(payment).subscribe({
      next: (res) => {
        var mapayment: IMakePayment = {
          memberId: member.id,
          membershipTypeId: member.membershipTypeId,
          payment: payment.amount,

          text_Rn: res.response.tx_ref,
          url: res.response.data.checkout_url
        };

        var url = res.response.data.checkout_url;
        this.makePayment(mapayment, url);
      },
      error: (err) => {}
    });
  }

  makePayment(makePay: IMakePayment, url: string) {
    this.paymentService.MakePayment(makePay).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          window.location.href = url;
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
