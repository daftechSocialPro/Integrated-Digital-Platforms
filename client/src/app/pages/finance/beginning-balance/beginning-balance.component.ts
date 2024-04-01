import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BeginningBalanceGetDto } from 'src/app/model/Finance/IBeginningBalanceDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';
import { AddBeginningBalanceComponent } from './add-beginning-balance/add-beginning-balance.component';

@Component({
  selector: 'app-beginning-balance',
  templateUrl: './beginning-balance.component.html',
  styleUrls: ['./beginning-balance.component.css']
})
export class BeginningBalanceComponent implements OnInit {

  beginningBalanceList!: BeginningBalanceGetDto[]
  accountingPeriodDropDown!: SelectList[]


  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal,
    private userService: UserService,
    private dropDownService: DropDownService
  ){}

  ngOnInit(): void {
    this.getAccountingPeriodDropDown()
  }

  getAccountingPeriodDropDown(){
    this.dropDownService.getAccountingPeriodDropDown().subscribe({
      next: (res) => {
        this.accountingPeriodDropDown = res
      }
    })
  }
  getBeginnigBalanceChart(periodId: any){
    
    this.financeService.getChartsForBegnning(periodId).subscribe({
      next : (res) => {
        if(res.success){
          this.beginningBalanceList = res.data
        }
        
      }
    })
  }

  onAccountinPeriodChange(event: any){
    const periodId = event.value
    this.getBeginnigBalanceChart(periodId)
  }

  addBeginningBalance(){
    
    let modalRef = this.modalService.open(AddBeginningBalanceComponent,{size:'xl',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getAccountingPeriodDropDown()
    })
    
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
