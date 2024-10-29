import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AccountTypePostDto } from 'src/app/model/Finance/IAccountTypeDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-account-type',
  templateUrl: './add-account-type.component.html',
  styleUrls: ['./add-account-type.component.css']
})
export class AddAccountTypeComponent implements OnInit {

  accountType!: AccountTypePostDto
  accountTypeForm!: FormGroup;
  user !: UserView;

  accountTypeCategory = [
    { value: "OTHER", name: "OTHER" },
    { value: "ASSET", name: "ASSET" },
    { value: "CAPITAL", name: "CAPITAL" },
    { value: "EXPENSE", name: "EXPENSE" },
    { value: "REVENUE", name: "REVENUE" },
    { value: "LIABILITY", name: "LIABILITY" },
  ]

  normalBalance = [
    { value: "CREDIT", name: "CREDIT" },
    { value: "DEBT", name: "DEBT" }
  ]


  accountTypeSubCategory = [
    { value: "CURRENT_ASSET", name: "CURRENT_ASSET" },
    { value: "CAPITAL", name: "CAPITAL" },
    { value: "COST_OF_SALES", name: "COST_OF_SALES" },
    { value: "CURRENT_LIABILITY", name: "CURRENT_LIABILITY" },
    { value: "EQUITY", name: "EQUITY" },
    { value: "EXPENSES", name: "EXPENSES" },
    { value: "FIXED_ASSET", name: "FIXED_ASSET" },
    { value: "INCOME", name: "INCOME" },
    { value: "LIABILITY", name: "LIABILITY" },
    { value: "LONG_TERM_LIABILITY", name: "LONG_TERM_LIABILITY" },
    { value: "MEDIUM_TERM_LIABILITY", name: "MEDIUM_TERM_LIABILITY" },
    { value: "OTHER_ASSET", name: "OTHER_ASSET" },
  ]

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    if (this.accountType) {
      this.accountTypeForm = this.formBuilder.group({
        type: [this.accountType.type, Validators.required],
        normal_Balance: [this.accountType.normal_Balance],
        category: [this.accountType.category],
        subCategory: [this.accountType.subCategory],
        remark: [this.accountType.remark],
      });
    }
    else {
      this.accountTypeForm = this.formBuilder.group({
        type: ['', Validators.required],
        normal_Balance: [''],
        temporary: [''],
        category: [''],
        subCategory: [''],
        remark: [''],
      });
    }

  }

  

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.accountTypeForm.valid) {

      if (this.accountType) {
        var accountTypePost: AccountTypePostDto = {
          id: this.accountType.id,
          category: this.accountTypeForm.value.category,
          createdById: this.user.employeeId,
          normal_Balance: this.accountTypeForm.value.normal_Balance,
          subCategory: this.accountTypeForm.value.subCategory,
          remark: this.accountTypeForm.value.remark,
          type: this.accountTypeForm.value.type
        }

        this.financeService.updateAccountType(accountTypePost).subscribe({
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
        var accountTypePost: AccountTypePostDto = {
          category: this.accountTypeForm.value.category,
          createdById: this.user.userId,
          normal_Balance: this.accountTypeForm.value.normal_Balance,
          subCategory: this.accountTypeForm.value.subCategory,
          remark: this.accountTypeForm.value.remark,
          type: this.accountTypeForm.value.type,
        }

        this.financeService.addAccountType(accountTypePost).subscribe({
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
