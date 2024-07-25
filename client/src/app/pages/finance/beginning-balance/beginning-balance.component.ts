import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { AddBegnningBalanceDto, BeginngBalanceDetailDto, BeginningBalanceGetDto, BeginningBalancePostDto } from 'src/app/model/Finance/IBeginningBalanceDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-beginning-balance',
  templateUrl: './beginning-balance.component.html',
  styleUrls: ['./beginning-balance.component.css']
})
export class BeginningBalanceComponent implements OnInit {

  beginningBalanceList!: BeginningBalanceGetDto[]
  accountingPeriodDropDown!: SelectList[]
  addBeginningBalanceDetailList: AddBegnningBalanceDto = new AddBegnningBalanceDto();
  user:UserView;
  exists: boolean = false;
 

  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal,
    private userService: UserService,
    private dropDownService: DropDownService,
    private messageService: MessageService,

  ){}

  ngOnInit(): void {
    this.getAccountingYear()
    this.user = this.userService.getCurrentUser()
    this.addBeginningBalanceDetailList.totalCredit = 0;
    this.addBeginningBalanceDetailList.totalDebit = 0;
  }

  getAccountingYear(){
    this.dropDownService.getAccountingYear().subscribe({
      next: (res) => {
        this.accountingPeriodDropDown = res
      }
    })
  }
  getBeginnigBalanceChart(periodId: any){ 
    this.financeService.getChartsForBegnning(periodId).subscribe({
      next : (res) => {
        this.exists = !res.success;
        if(res.success){
          this.beginningBalanceList = res.data
          
        }
        else{
          this.messageService.add({ severity: 'warn', summary: 'Information', detail: res.message, life: 3000 });
          this.beginningBalanceList = res.data
          this.addBeginningBalanceDetailList.totalCredit = this.beginningBalanceList.filter(x => x.type == "CREDIT").reduce((sum, balance) => {
            return sum + (balance.ammount || 0);
          }, 0);
          this.addBeginningBalanceDetailList.totalDebit = this.beginningBalanceList.filter(x => x.type == "DEBT").reduce((sum, balance) => {
            return sum + (balance.ammount || 0);
          }, 0);
        }
        
      }
    })
  }

  

  getTextChanged(input: any, type: string) {
    if (type == "CREDIT") {
      const totalAmount = this.beginningBalanceList.filter(x => x.type == "CREDIT").reduce((sum, balance) => {
        return sum + (balance.ammount || 0);
        
      }, 0);
      this.addBeginningBalanceDetailList.totalCredit =  totalAmount
    }
    else {
      const totalAmount = this.beginningBalanceList.filter(x => x.type == "DEBT").reduce((sum, balance) => {
        return sum + (balance.ammount || 0);
      }, 0);
      this.addBeginningBalanceDetailList.totalDebit = totalAmount
    }
  }

 

  onAccountinPeriodChange(event: any){
    this.getBeginnigBalanceChart(event);
    this.addBeginningBalanceDetailList = new AddBegnningBalanceDto();
    this.addBeginningBalanceDetailList.accountingPeriodId = event;
  }
 
  // onAccountinPeriodChange(value: string){

  //   const periodId = value
  //   this.getBeginnigBalanceChart(periodId)
  // }

  addBeginningBalance() {
    debugger;
    this.addBeginningBalanceDetailList.createdById = this.user.userId;
    this.addBeginningBalanceDetailList.begningBalanceDetails = [];
    this.beginningBalanceList.map(x => {
      if (x.subsidaryAccountBegningDtos.length == 0) {
        this.addBeginningBalanceDetailList.begningBalanceDetails.push({
          ammount: x.ammount,
          chartOfAccountId: x.id,
          remark: x.remark,
        });
        if(x.type == "CREDIT"){
          this.addBeginningBalanceDetailList.totalCredit =   x.ammount
        }
        else{
          this.addBeginningBalanceDetailList.totalDebit =   x.ammount
        }
      }
      else if (x.subsidaryAccountBegningDtos.length > 0) {
        x.subsidaryAccountBegningDtos.map(y => {
          this.addBeginningBalanceDetailList.begningBalanceDetails.push({
            ammount: x.ammount,
            chartOfAccountId: x.id,
            subsidaryAccountId: y.id,
            remark: y.remark,
          });
          if(x.type == "CREDIT"){
            this.addBeginningBalanceDetailList.totalCredit =   y.ammount
          }
          else{
            this.addBeginningBalanceDetailList.totalDebit =   y.ammount
          }
        });
      }
    })
    if(this.addBeginningBalanceDetailList.totalDebit != this.addBeginningBalanceDetailList.totalCredit){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credit and/or Debit are not correct', life: 3000 });
    }
    else{
    this.financeService.addBegnningBalance(this.addBeginningBalanceDetailList).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
          this.beginningBalanceList = [];
          this.addBeginningBalanceDetailList = new AddBegnningBalanceDto();
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
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
