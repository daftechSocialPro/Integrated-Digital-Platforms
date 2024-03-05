import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { FinanceLookupPostDto } from 'src/app/model/Finance/IFinanceLookupTypeDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-finance-lookup',
  templateUrl: './add-finance-lookup.component.html',
  styleUrls: ['./add-finance-lookup.component.css']
})
export class AddFinanceLookupComponent implements OnInit {

  financelookup!: FinanceLookupPostDto
  financeLookupForm!: FormGroup;
  user !: UserView;



  lookUpCategory = [
    { value: "ACCOUNTING", name: "ACCOUNTING" },
    { value: "GLOBAL SYSTEM LIBRARY", name: "GLOBALSYSTEMLIBRARY" },
    { value: "VOUCHER", name: "VOUCHER" },
  ]

  lookUpType = [
    { value: "ARTICLE", name: "ARTICLE" },
    { value: "BUSSINESS TYPE", name: "BUSSINESS_TYPE" },
    { value: "COASTING", name: "COASTING" },
    { value: "CUSTOMER STATUS", name: "CUSTOMER_STATUS" },
    { value: "DISTRIBUTION", name: "DISTRIBUTION" },
    { value: "COSTING", name: "COSTING" },
  ]




  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    if (this.financelookup) {
      this.financeLookupForm = this.formBuilder.group({
        category: [this.financelookup.category, Validators.required],
        lookupType: [this.financelookup.lookupType, Validators.required],
        lookupValue: [this.financelookup.lookupValue],
        description: [this.financelookup.description],
        isDefault: [this.financelookup.isDefault],
        remark: [this.financelookup.remark],
      });
    }
    else {
      this.financeLookupForm = this.formBuilder.group({
        category: ['', Validators.required],
        lookupType: ['', Validators.required],
        lookupValue: [''],
        description: [''],
        isDefault: [''],
        remark: [''],
      });
    }

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService) {
  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.financeLookupForm.valid) {

      if (this.financelookup) {
        var financeLookUpPost: FinanceLookupPostDto = {
          id: this.financelookup.id,
          category: this.financeLookupForm.value.category,
          createdById: this.user.employeeId,
          description: this.financeLookupForm.value.description,
          isDefault: this.financeLookupForm.value.isDefault,
          lookupType: this.financeLookupForm.value.lookupType,
          lookupValue: this.financeLookupForm.value.lookupValue,
          remark: this.financeLookupForm.value.remark,
        }

        this.financeService.updateFinanceLookup(financeLookUpPost).subscribe({
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
      else {
        var financeLookUpPost: FinanceLookupPostDto = {
          category: this.financeLookupForm.value.category,
          createdById: this.user.userId,
          description: this.financeLookupForm.value.description,
          isDefault: this.financeLookupForm.value.isDefault,
          lookupType: this.financeLookupForm.value.lookupType,
          lookupValue: this.financeLookupForm.value.lookupValue,
          remark: this.financeLookupForm.value.remark,
        }

        this.financeService.addFinanceLookup(financeLookUpPost).subscribe({
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

}
