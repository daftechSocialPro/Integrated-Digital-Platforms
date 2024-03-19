import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BankSelectList, ItemDropDownDto, SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/app/model/user';
import { AddPaymentDetailDto, PaymentPostDto } from 'src/app/model/Finance/IPaymentDto';



@Component({
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.css']
})
export class AddPaymentsComponent implements OnInit{

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
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService
  ){}

  ngOnInit(): void {
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
       this.paymentDetailList.map(x => x.totalPrice = (x.quantity * x.price)) 
       addPaymentData.addPaymentDetails = this.paymentDetailList
       var formData = new FormData();
       
        for (let key in addPaymentData) {
          if (addPaymentData.hasOwnProperty(key)) {
            formData.append(key, (addPaymentData as any)[key]);
          }
        }
        for (var i = 0; i < this.paymentDetailList.length; i++) {
          formData.append("addPaymentDetails", JSON.stringify(this.paymentDetailList[i]));
        }

       
       formData.append('documentPath', this.uploadedFiles.length > 0 ? this.uploadedFiles[0] : null);
  
       this.financeService.addPayments(addPaymentData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.paymentDetailList = [];
            this.addPaymentDetailList = new AddPaymentDetailDto();
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
    console.log("this.uploadedFiles", this.uploadedFiles.length)

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  onRemove() {
    
    this.uploadedFiles.splice(0, this.uploadedFiles.length);
    console.log("this.uploadedFiles", this.uploadedFiles.length)

    this.messageService.add({severity: 'error', summary: 'File Removed', detail: ''});
  }
  closeModal() {
    this.activeModal.close();
  }
}
