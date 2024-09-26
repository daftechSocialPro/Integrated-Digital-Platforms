import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddTaxRateDto } from 'src/app/model/Finance/ITaxRateDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-tax-rate',
  templateUrl: './add-tax-rate.component.html',
  styleUrls: ['./add-tax-rate.component.css']
})
export class AddTaxRateComponent implements OnInit {

  taxRateForm!: FormGroup;
  user !: UserView;

  taxType = [
    { value: 0, name: "No Tin Taxpayer" },
    { value: 1, name: "Vat Registered" },
    { value: 2, name: "Tot Registered Two Percent" },
    { value: 3, name: "Tot Registered Ten Percent" },
    { value: 4, name: "None Tax Payer" },
    { value: 5, name: "Non Taxable" },
  ]


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.taxRateForm = this.formBuilder.group({
      taxEntityType: [Validators.required],
      taxRate: [Validators.required,Validators.min(0)],
      witholding: [Validators.required,Validators.min(0)],
    });
  }



  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.taxRateForm.valid) {

      var taxRatePostDto: AddTaxRateDto = {
        taxEntityType: parseInt(this.taxRateForm.value.taxEntityType),
        taxRate: this.taxRateForm.value.taxRate,
        witholding: this.taxRateForm.value.witholding,
        createdById: this.user.userId,
      }
      this.financeService.addTaxRate(taxRatePostDto).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })

    }
  }

}