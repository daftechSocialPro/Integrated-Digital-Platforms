import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { AddJournalVochureDto, AddJournalVoucherDetailDto } from 'src/app/model/Finance/IJournalVoucherDto';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-journal-voucher',
  templateUrl: './add-journal-voucher.component.html',
  styleUrls: ['./add-journal-voucher.component.css']
})
export class AddJournalVoucherComponent implements OnInit {

  user!: UserView
  accountingPeriodDropDown!: SelectList[]
  chartOfAccountDropDown!: SelectList[]
  subsidaryAccount: SelectList[] = [] ;
  addJournal: AddJournalVochureDto = new AddJournalVochureDto();
  journalDetailList: AddJournalVoucherDetailDto[];
  addJournalDetails: AddJournalVoucherDetailDto = new AddJournalVoucherDetailDto();
  

  constructor(
    private financeService: FinanceService,
    private routerService: Router,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getChartOfAccountDropDown();
    this.getAccountingPeriodDropDown();
  }

  
 
  getAccountingPeriodDropDown() {
    this.dropDownService.getAccountingPeriodDropDown().subscribe({
      next: (res) => {
        this.accountingPeriodDropDown = res
      }
    })
  }
  getChartOfAccountDropDown() {
    this.dropDownService.getChartOfAccountsDropDown().subscribe({
      next: (res) => {
        this.chartOfAccountDropDown = res
      }
    })
  }

  getSubsidaryAccount(chartOfAccountId: any) {
    debugger;
    this.dropDownService.getSubsidaryAccount(chartOfAccountId.value).subscribe({
      next: (res) => {
        this.subsidaryAccount = res
      }
    })
  }
  
  removeData(index: number) {
   // this.journalDetailList = this.journalDetailList.filter(x => x.index != index);
  }



  newRow() {
    if (this.addJournalDetails.chartOfAccountId) {
      this.chartOfAccountDropDown.some(x => {
        if (x.id == this.addJournalDetails.chartOfAccountId) {
          this.addJournalDetails.chartOfAccount = x.name;
        }
      });
    }
    if(this.addJournalDetails.subsidiaryAccountId){
      this.subsidaryAccount.some(x => {
        if (x.id == this.addJournalDetails.subsidiaryAccountId) {
          this.addJournalDetails.subsidaryAccount = x.name;
        }
      });
    }
    debugger;
    this.journalDetailList.unshift(this.addJournalDetails);
    //this.items = "";
    this.addJournalDetails = new AddJournalVoucherDetailDto();
  }


  submit() {
    let totalDebit = this.journalDetailList.map(bill => bill.debit).reduce((acc, amount) => acc + amount);
    let totalCredit = this.journalDetailList.map(bill => bill.credit).reduce((acc, amount) => acc + amount);
    if (this.journalDetailList.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one Journal Voucher', life: 3000 });
    }
    else if(totalCredit != totalDebit){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Total debit and credit are not equal please check your fields', life: 3000 });
    }
    else {
      this.addJournal.createdById = this.user.userId;
      this.addJournal.typeofJV = 1;
      this.financeService.addJournalVochure(this.addJournal).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.journalDetailList = [];
            this.addJournal = new AddJournalVochureDto();
            this.addJournalDetails = new AddJournalVoucherDetailDto();
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
 
  
  goToJV() {
    this.routerService.navigateByUrl('/finance/journalVoucher')
  }

  
}