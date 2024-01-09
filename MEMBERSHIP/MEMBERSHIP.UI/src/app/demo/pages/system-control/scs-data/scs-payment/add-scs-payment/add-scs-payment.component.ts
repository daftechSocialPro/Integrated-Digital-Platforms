import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-scs-payment',
  templateUrl: './add-scs-payment.component.html',
  styleUrls: ['./add-scs-payment.component.scss']
})
export class AddScsPaymentComponent implements OnInit {

  @Input() Payment: IGeneralSettingDto
  PaymentForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.Payment) {
      this.PaymentForm = this.formBuilder.group({
        name: [this.Payment.inputValues, Validators.required],

      })
    }
    else {
      this.PaymentForm = this.formBuilder.group({

        name: ['', Validators.required],

      })
    }


  }

  submit() {

    if (this.PaymentForm.valid) {

      let addPayment: IGeneralSettingDto = {
        inputValues: this.PaymentForm.value.name,
        inputCategory: "PAYMENTMODE"
      }

      this.controlService.addGeneralSetting(addPayment).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })


    }
    else {


    }
  }

  update() {
    if (this.PaymentForm.valid) {

      let addPayment: IGeneralSettingDto = {
        inputValues: this.PaymentForm.value.name,
        inputCategory: "PAYMENTMODE",
        recordno: this.Payment.recordno
      }

      this.controlService.updateGeneralSetting(addPayment).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })
    }
    else { }
  }
  closeModal() {
    this.activeModal.close()
  }

}
