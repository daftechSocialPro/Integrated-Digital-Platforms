import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountReconsilationFindDto, AccountToBeReconsiledDto, AddAccountReconsilationDto, CheckAndBalanceDto, DepositBankDto } from 'src/app/model/Finance/IAccountReconsilationDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-reconcilliation',
  templateUrl: './account-reconcilliation.component.html',
  styleUrls: ['./account-reconcilliation.component.css']
})
export class AccountReconcilliationComponent implements OnInit {

  bankDropDowns!: SelectList[];
  accountingPeriodDropDown!: SelectList[];
  searchAccount: AccountReconsilationFindDto = new AccountReconsilationFindDto();
  accountToBeReconsiled: AccountToBeReconsiledDto = new AccountToBeReconsiledDto();
  selectedCheck: CheckAndBalanceDto[] = [];
  selectedDeposit: DepositBankDto[] = [];
  addAccountReconsilation: AddAccountReconsilationDto = new AddAccountReconsilationDto();
  user: UserView;

  constructor(
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService

  ){}

  ngOnInit(): void {
    this.getAccountingPeriodDropDown()
    this.getBankDropDown()
    this.user = this.userService.getCurrentUser()

  }


  getAccountingPeriodDropDown(){
    this.dropDownService.getAccountingPeriodDropDown().subscribe({
      next: (res) => {
        this.accountingPeriodDropDown = res
      }
    })
  }
  getBankDropDown(){
    this.dropDownService.getBankDropDowns().subscribe({
      next: (res) => {
        this.bankDropDowns = res
      }
    })
  }

  getAccountToBeReconsiled(){
    this.addAccountReconsilation = new AddAccountReconsilationDto();
    this.financeService.getAccountToBeReconsiled(this.searchAccount).subscribe({
      next: (res) => {
        this.accountToBeReconsiled = res;
      }
    });
  }


  saveCurrentBalance(){
    this.addAccountReconsilation.createdById = this.user.userId;
    this.addAccountReconsilation.periodId = this.searchAccount.accountingPeriodId;
    this.addAccountReconsilation.bankId = this.searchAccount.bankId;
    this.financeService.addAccountReconsilation(this.addAccountReconsilation).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
        }
      }, error: (res) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
      }
    });
  }
  

}
