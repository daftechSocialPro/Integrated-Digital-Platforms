import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AccountTypePostDto } from 'src/app/model/Finance/IAccountTypeDto';
import { ChartOfAccountsGetDto, ChartOfAccountsPostDto } from 'src/app/model/Finance/IChartOfAccountsDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-chart-of-accounts',
  templateUrl: './add-chart-of-accounts.component.html',
  styleUrls: ['./add-chart-of-accounts.component.css']
})
export class AddChartOfAccountsComponent implements OnInit {
  @Input() chartOfAccounts!: ChartOfAccountsGetDto
  accountTypeSelectList!: SelectList[]
  chartOfAccountsForm!: FormGroup
  user!: UserView
  constructor(
    private financeService : FinanceService, 
    private formBuilder:FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getAccountTypeSelectList()
    if(this.chartOfAccounts){
      this.chartOfAccountsForm = this.formBuilder.group({
        accountTypeId:["",Validators.required],
        accountNo:[this.chartOfAccounts.accountNo,Validators.required],
        description:[this.chartOfAccounts.description,Validators.required],
        onlyControlAccount:[this.chartOfAccounts.onlyControlAccount,Validators.required],
      })
    }
    else{
      this.chartOfAccountsForm = this.formBuilder.group({
        accountTypeId:["",Validators.required],
        accountNo:["",Validators.required],
        description:["",Validators.required],
        onlyControlAccount:[false],
      })

    }
  }
  getAccountTypeSelectList(){
    this.financeService.getAccountTypesSelectList().subscribe({
      next : (res) =>{
        this.accountTypeSelectList = res
        const accountType = this.accountTypeSelectList.find(x => x.name == this.chartOfAccounts.accountType)
        this.chartOfAccountsForm.controls['accountTypeId'].setValue(accountType)
      }
    })
  }


  submit() {

    if (this.chartOfAccountsForm.valid) {

      if (this.chartOfAccounts) {
        var chartOfAccountPost: ChartOfAccountsPostDto = {
          id: this.chartOfAccounts.id,
          accountTypeId: this.chartOfAccountsForm.value.accountTypeId.id,
          accountNo: this.chartOfAccountsForm.value.accountNo,
          description: this.chartOfAccountsForm.value.description,
          onlyControlAccount: this.chartOfAccountsForm.value.onlyControlAccount,
          createdById: this.user.userId 
        }

        this.financeService.updateChartOfAccounts(chartOfAccountPost).subscribe({
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
        var chartOfAccountPost: ChartOfAccountsPostDto = {
          accountTypeId: this.chartOfAccountsForm.value.accountTypeId,
          accountNo: this.chartOfAccountsForm.value.accountNo,
          description: this.chartOfAccountsForm.value.description,
          onlyControlAccount: this.chartOfAccountsForm.value.onlyControlAccount,
          createdById: this.user.userId 
        }

        this.financeService.addChartOfAccounts(chartOfAccountPost).subscribe({
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

  closeModal() {
    this.activeModal.close();
  }
}
