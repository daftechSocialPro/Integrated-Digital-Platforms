import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { AddJournalVochureDto, AddJournalVoucherDetailDto } from 'src/app/model/Finance/IJournalVoucherDto';
import { PaymentDetailListDto } from 'src/app/model/Finance/IPaymentDto';
import { ReceiptDetailGetDto } from 'src/app/model/Finance/IReceiptModel';
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
  @Input() paymentDetailList!: PaymentDetailListDto[]
  @Input() receiptDetailGet!: ReceiptDetailGetDto[]
  user!: UserView
  accountingPeriodDropDown!: SelectList[]
  chartOfAccountDropDown!: SelectList[]
  subsidaryAccount: SelectList[] = [] ;
  addJournal: AddJournalVochureDto = new AddJournalVochureDto();
  journalDetailList: AddJournalVoucherDetailDto[] = [];
  addJournalDetails: AddJournalVoucherDetailDto = new AddJournalVoucherDetailDto();
  taxType = [
    { value: 0, name: "No Tin Taxpayer" },
    { value: 1, name: "Vat Registered" },
    { value: 2, name: "Tot Registered Two Percent" },
    { value: 3, name: "Tot Registered Ten Percent" },
    { value: 4, name: "None Tax Payer" },
    { value: 5, name: "Non Taxable" },
  ]

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private financeService: FinanceService,
    private routerService: Router,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log(this.paymentDetailList, this.receiptDetailGet)
    if(!this.paymentDetailList || !this.receiptDetailGet){
      this.document.body.classList.toggle('toggle-sidebar');
    }
    this.user = this.userService.getCurrentUser();
    this.getChartOfAccountDropDown();
    this.getAccountingPeriodDropDown();
    this.addJournal.typeofJV = 1;
        
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
        if(this.paymentDetailList){
          let itemList: AddJournalVoucherDetailDto[] = this.paymentDetailList.map(x => ({
            chartOfAccount: x.chartOfAccount,
            debit: x.totalPrice,
            credit: x.totalPrice,
            chartOfAccountId: this.chartOfAccountDropDown.find(z => z.name == x.chartOfAccount).id,
            subsidiaryAccountId: "",
            remark:x.description
          }))
          this.journalDetailList = itemList
          this.addJournal.typeofJV = 0
        }
        if(this.receiptDetailGet){
          let itemList: AddJournalVoucherDetailDto[] = this.receiptDetailGet.map(x => ({
            chartOfAccount: x.chartOfAccountName,
            debit: x.quantity * x.unitPrice,
            credit: x.quantity * x.unitPrice,
            chartOfAccountId: x.chartOfAccountId,
            subsidiaryAccountId: x.subsidiaryAccountId,
            remark:x.description
          }))
          this.journalDetailList = itemList
          this.addJournal.typeofJV = 0
        }
      }
    })
  }

  getSubsidaryAccount(chartOfAccountId: any) {
    this.dropDownService.getSubsidaryAccount(chartOfAccountId.value).subscribe({
      next: (res) => {
        this.subsidaryAccount = res
      }
    })
  }
  
  removeData(index: number) {
    this.journalDetailList.splice(index, 1);
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
    this.journalDetailList.unshift(this.addJournalDetails);
    //this.items = "";
    this.addJournalDetails = new AddJournalVoucherDetailDto();
  }


  submit() {
    
    if (this.journalDetailList.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one Journal Voucher', life: 3000 });
    }
    let totalDebit = this.journalDetailList.map(bill => bill.debit).reduce((acc, amount) => acc + amount);
    let totalCredit = this.journalDetailList.map(bill => bill.credit).reduce((acc, amount) => acc + amount);
    if(totalCredit != totalDebit){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Total debit and credit are not equal please check your fields', life: 3000 });
    }
    else {
      this.addJournal.addJournalVoucherDetailDtos = this.journalDetailList
      this.addJournal.createdById = this.user.userId;
      
      this.financeService.addJournalVochure(this.addJournal).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.journalDetailList = [];
            this.addJournal = new AddJournalVochureDto();
            this.addJournalDetails = new AddJournalVoucherDetailDto();
            this.goToJV()
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
    this.document.body.classList.toggle('toggle-sidebar');
    this.routerService.navigateByUrl('/finance/journalVoucher')
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}