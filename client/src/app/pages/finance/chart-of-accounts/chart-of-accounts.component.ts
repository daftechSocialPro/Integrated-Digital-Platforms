import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartOfAccountsGetDto, SubsidiaryAccountsGetDto } from 'src/app/model/Finance/IChartOfAccountsDto';
import { SelectList } from 'src/app/model/common';
import { FinanceService } from 'src/app/services/finance.service';
import { AddChartOfAccountsComponent } from './add-chart-of-accounts/add-chart-of-accounts.component';
import { AddSubsidiaryAccountComponent } from './add-subsidiary-account/add-subsidiary-account.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {

  chartOfAccounts!: ChartOfAccountsGetDto[]

  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal,
    private messageService: MessageService
    ){}

  ngOnInit(): void {
      this.getChartOfAccounts()
  }

  getChartOfAccounts(){
    this.financeService.getChatOfAccounts().subscribe({
      next: (res) => {
        this.chartOfAccounts = res
        console.log("this.chartOfAccounts",this.chartOfAccounts)
      }
    })
  }
  addChartOfAccounts(){
    let modalRef = this.modalService.open(AddChartOfAccountsComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getChartOfAccounts()
    })
  }

  updateChartOfAccounts(chartOfAccounts: ChartOfAccountsGetDto){
    let modalRef = this.modalService.open(AddChartOfAccountsComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.chartOfAccounts = chartOfAccounts
    modalRef.result.then(()=>{
      this.getChartOfAccounts()
    });
  }

  addSubsidiaryAccount(chartOfAccountId: string){
    let modalRef = this.modalService.open(AddSubsidiaryAccountComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.chartOfAccountId = chartOfAccountId
    modalRef.result.then(()=>{
      this.getChartOfAccounts()
    })
  }
  updateSubsidiaryAccount(subacc: SubsidiaryAccountsGetDto,chartOfAccountId: string){
    let modalRef = this.modalService.open(AddSubsidiaryAccountComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.subsidiaryAccount = subacc
    modalRef.componentInstance.chartOfAccountId = chartOfAccountId
    modalRef.result.then(()=>{
      this.getChartOfAccounts()
    });
  }

  changeChartsOfAccountsStatus(chartOfAccountId: string){

    this.financeService.changeChartOfAccountStatus(chartOfAccountId).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          
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

  changeSubsidiaryAccountStatus(subsidiaryAccountId: string){

    this.financeService.changeSubsidiaryAccountStatus(subsidiaryAccountId).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          
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
