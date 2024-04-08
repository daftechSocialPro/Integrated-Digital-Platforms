import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-reconcilliation',
  templateUrl: './account-reconcilliation.component.html',
  styleUrls: ['./account-reconcilliation.component.css']
})
export class AccountReconcilliationComponent implements OnInit {

  chartOfAccountsDropDown!: SelectList[]
  accountingPeriodDropDown!: SelectList[]
  checksAndBalanceDebits = [

  ]  
  depositAndBankCredit = [

  ]


  constructor(
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService

  ){}

  ngOnInit(): void {
    this.getAccountingPeriodDropDown()
    this.getChartOfAccountDropDown()
  }


  getAccountingPeriodDropDown(){
    this.dropDownService.getAccountingPeriodDropDown().subscribe({
      next: (res) => {
        this.accountingPeriodDropDown = res
      }
    })
  }
  getChartOfAccountDropDown(){
    this.dropDownService.getChartOfAccountsDropDown().subscribe({
      next: (res) => {
        this.chartOfAccountsDropDown = res
      }
    })
  }
  

}
