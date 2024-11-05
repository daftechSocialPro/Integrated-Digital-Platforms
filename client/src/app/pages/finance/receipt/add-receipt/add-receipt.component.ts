import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BankSelectList, SelectList, ItemDropDownDto } from 'src/app/model/common';
import { AddReceiptDetailDto, AddReceiptDto } from 'src/app/model/Finance/IReceiptModel';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css']
})
export class AddReceiptComponent implements OnInit{

  user!: UserView
  paymentForm!: FormGroup;
  bankDropDown!: BankSelectList[]
  supplierDropDown!: SelectList[]
  chartOfAccountDropDown!: SelectList[]
  itemsDropDown!: ItemDropDownDto[];
  
  paymentDetailList: AddReceiptDetailDto[] = [];
  addPaymentDetailList: AddReceiptDetailDto = new AddReceiptDetailDto();
  uploadedFiles: any[] = [];
  subsidaryAccount: SelectList[] = [] ;

  addReceiptForm: FormGroup;

  projectlist:SelectList[]=[]

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private routerService : Router,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
  
  ){}

  ngOnInit(): void {

    this.document.body.classList.toggle('toggle-sidebar');
    this.user = this.userService.getCurrentUser()
    this.getBankDropDown()
    this.getChartOfAccountDropDown()
    this.getSupplierDropDown()
    this.getItems()
    this.getProjects()  

    this.paymentForm = this.formBuilder.group({
     
      bankId: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      receiptNumber: ['', Validators.required],
      date: ['', Validators.required],
      //addReceiptDetails: this.formBuilder.array([])
      // addPaymentDetails: this.formBuilder.array([this.createPaymentItem()])
    });  
  }

 
 getProjects (){
  this.dropDownService.getProjectDropDowns().subscribe({
    next:(res)=>{
      this.projectlist = res
    }
  })
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
 
  getChartOfAccountDropDown(){
    this.dropDownService.getChartOfAccountsDropDown().subscribe({
      next: (res) => {
        this.chartOfAccountDropDown = res
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
    }
    if(this.addPaymentDetailList.chartOfAccountId){
      this.chartOfAccountDropDown.some(x => {
        if (x.id == this.addPaymentDetailList.chartOfAccountId) {
          this.addPaymentDetailList.chartOfAccountName = x.name;
        }
      });
    }
    if(this.addPaymentDetailList.subsidiaryAccountId){
      this.subsidaryAccount.some(x => {
        if (x.id == this.addPaymentDetailList.subsidiaryAccountId) {
          this.addPaymentDetailList.subsidiaryAccountName = x.name;
        }
      });
    }
    if(this.addPaymentDetailList.projectId){
      this.projectlist.some(x => {
        if (x.id == this.addPaymentDetailList.projectId) {
          this.addPaymentDetailList.projectName = x.name;
        }
      });
    }

      this.paymentDetailList.unshift(this.addPaymentDetailList);
    
    //this.items = "";
    this.addPaymentDetailList = new AddReceiptDetailDto();
  }
  submit(){
    if(this.paymentDetailList.length <= 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one payment detail', life: 3000 });
    }
    else{
      const addPaymentData: AddReceiptDto ={
        bankId: this.paymentForm.value.bankId,
        referenceNumber: this.paymentForm.value.referenceNumber,
        receiptNumber: this.paymentForm.value.receiptNumber,
        date: this.paymentForm.value.date,       
        createdById: this.user.userId,
        addReceiptDetails :this.paymentDetailList
        
       } 


       this.financeService.addRecipet(addPaymentData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.paymentDetailList = [];
            this.addPaymentDetailList = new AddReceiptDetailDto();
         //   this.goToPayments()
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

    this.routerService.navigateByUrl('/finance/receipt')
  }
}
