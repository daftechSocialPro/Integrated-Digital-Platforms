import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddPaymentDetailDto, PaymentPostDto } from 'src/app/model/Finance/IPaymentDto';
import { SelectList, BankSelectList, ItemDropDownDto } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  user!: UserView
  paymentForm!: FormGroup;
  accountingPeriodDropDown!: SelectList[]
  bankDropDown!: BankSelectList[]
  supplierDropDown!: SelectList[]
  chartOfAccountDropDown!: SelectList[]
  itemsDropDown!: ItemDropDownDto[];
  paymentTypeList = [
    {name:"Transfer",value:"TRANSFER"},
    {name:"Check",value:"CHECK"},
    {name:"Cash",value:"CASH"},
  ]
  paymentDetailList: AddPaymentDetailDto[] = [];
  addPaymentDetailList: AddPaymentDetailDto = new AddPaymentDetailDto();
  uploadedFiles: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private routerService : Router,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService
  ){}

  ngOnInit(): void {

    this.document.body.classList.toggle('toggle-sidebar');
    this.user = this.userService.getCurrentUser()
    this.getBankDropDown()
    this.getChartOfAccountDropDown()
    this.getAccountingPeriodDropDown()
    this.getSupplierDropDown()
    this.getItems()

    this.paymentForm = this.formBuilder.group({
      accountingPeriodId:['',Validators.required],
      paymentDate:[null,Validators.required],
      paymentType:['',Validators.required],
      paymentNumber:[''],
      bankId:['',Validators.required],
      supplierId:['',Validators.required],
      remark:[''],
      // addPaymentDetails: this.formBuilder.array([this.createPaymentItem()])
    });  
  }

 



 
  getItems(){
    this.dropDownService.getItemsDropDown().subscribe({
      next: (res) => {
          this.itemsDropDown = res;
      }
    });
  }
  getBankDropDown(){
    this.dropDownService.getBankDropDowns().subscribe({
      next: (res) => {
        this.bankDropDown = res
      }
    })
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
        this.chartOfAccountDropDown = res
      }
    })
  }

  getSupplierDropDown(){
    this.dropDownService.getVendorDropDown().subscribe({
      next: (res) => {
        this.supplierDropDown = res
      }
    })
  }
  removeData(itemId: string) {
    this.paymentDetailList = this.paymentDetailList.filter(x => x.itemId != itemId);
  }



  newRow() {
    if (this.addPaymentDetailList.itemId) {
      
      this.itemsDropDown.some(x => {
        if (x.id == this.addPaymentDetailList.itemId) {
          this.addPaymentDetailList.itemName = x.name;
        }
      });
      this.chartOfAccountDropDown.some(x => {
        if (x.id == this.addPaymentDetailList.chartOfAccountId) {
          this.addPaymentDetailList.chartOfAccountName = x.name;
        }
      });

      this.paymentDetailList.unshift(this.addPaymentDetailList);
    }
    //this.items = "";
    this.addPaymentDetailList = new AddPaymentDetailDto();
  }
  submit(){
    if(this.paymentDetailList.length <= 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one payment detail', life: 3000 });
    }
    else{
      const addPaymentData: PaymentPostDto ={
        accountingPeriodId: this.paymentForm.value.accountingPeriodId,
        paymentDate: this.paymentForm.value.paymentDate,
        paymentType: this.paymentForm.value.paymentType,
        paymentNumber: this.paymentForm.value.paymentNumber,
        bankId: this.paymentForm.value.bankId,
        supplierId: this.paymentForm.value.supplierId,
        // documentPath: this.uploadedFiles.length > 0 ? this.uploadedFiles[0] : null,
        remark: this.paymentForm.value.remark,
        createdById: this.user.userId
        
       } 


       const formData = new FormData();

// Append each property of the addPaymentData object to the FormData
Object.keys(addPaymentData).forEach(key => {
    formData.append(key, addPaymentData[key]);
});
this.paymentDetailList.map(x => x.totalPrice = (x.quantity * x.price)) 
// addPaymentData.addPaymentDetails = this.paymentDetailList
// Append documentPath if available
if (this.uploadedFiles.length > 0) {
  formData.append('documentPath', this.uploadedFiles[0]);
}

// Append addPaymentDetails if available
if (this.paymentDetailList.length > 0) {
  for (let i = 0; i < this.paymentDetailList.length; i++) {
    const paymentDetail = this.paymentDetailList[i];
    for (const key in paymentDetail) {
      if (paymentDetail.hasOwnProperty(key)) {
        formData.append(`AddPaymentDetails[${i}].${key}`, paymentDetail[key]);
      }
    }
  }
}
       this.financeService.addPayments(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.paymentDetailList = [];
            this.addPaymentDetailList = new AddPaymentDetailDto();
            this.goToPayments()
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
  onUpload(event: any) {
    this.uploadedFiles.splice(0, this.uploadedFiles.length);
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  onRemove() {
    
    this.uploadedFiles.splice(0, this.uploadedFiles.length);
    

    this.messageService.add({severity: 'error', summary: 'File Removed', detail: ''});
  }
  // closeModal() {
  //   this.activeModal.close();
  // }

  goToPayments(){

    this.routerService.navigateByUrl('/finance/payments')
  }
}