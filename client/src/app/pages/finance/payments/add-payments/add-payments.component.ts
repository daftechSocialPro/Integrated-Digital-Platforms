import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BankSelectList, ItemDropDownDto, SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/app/model/user';
import { AddPaymentDetailDto, PaymentPostDto } from 'src/app/model/Finance/IPaymentDto';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AddVendorComponent } from 'src/app/pages/inventory/inventory-setting/vendor/add-vendor/add-vendor.component';



@Component({
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.css']
})
export class AddPaymentsComponent implements OnInit {

  user!: UserView
  paymentForm!: FormGroup;
  accountingPeriodDropDown!: SelectList[]
  bankDropDown!: BankSelectList[]
  supplierDropDown!: SelectList[]
  chartOfAccountDropDown!: SelectList[]
  itemsDropDown!: ItemDropDownDto[];
  employeeDropDown!: SelectList[];
  beneficiaryAccount: SelectList[];
  paymentTypeList = [
    { name: "Transfer", value: "TRANSFER" },
    { name: "Check", value: "CHECK" },
    { name: "Cash", value: "CASH" },
  ]

  typeOfPayee = [
    { name: "Supplier", value: 0 },
    { name: "Employee", value: 1 },
    { name: "Other", value: 2 },
  ]
  paymentDetailList: AddPaymentDetailDto[] = [];
  addPaymentDetailList: AddPaymentDetailDto = new AddPaymentDetailDto();
  uploadedFiles: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private routerService: Router,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {

    this.document.body.classList.toggle('toggle-sidebar');
    this.user = this.userService.getCurrentUser();
    this.getBankDropDown();
    this.getChartOfAccountDropDown();
    this.getAccountingPeriodDropDown();
    this.getSupplierDropDown();
    this.getItems();
    this.getEmployees();


    this.paymentForm = this.formBuilder.group({
      paymentDate: [null, Validators.required],
      paymentType: ['', Validators.required],
      paymentNumber: [''],
      bankId: ['', Validators.required],
      supplierId: [''],
      employeeId: [''],
      otherBeneficiary: [''],
      typeOfPayee: ['', Validators.required],
      remark: [''],
      beneficiaryAccountNumber:['']
      // addPaymentDetails: this.formBuilder.array([this.createPaymentItem()])
    })


  }

  getEmployees() {
    this.dropDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.employeeDropDown = res;
      }
    });
  }

  getItems() {
    this.dropDownService.getItemsDropDown().subscribe({
      next: (res) => {
        this.itemsDropDown = res;
      }
    });
  }
  getBankDropDown() {
    this.dropDownService.getBankDropDowns().subscribe({
      next: (res) => {
        this.bankDropDown = res
      }
    })
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

  getSupplierDropDown() {
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
  submit() {
    
    if (this.paymentDetailList.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one payment detail', life: 3000 });
    }
    else {
      const addPaymentData: PaymentPostDto = {
        paymentDate: this.paymentForm.value.paymentDate,
        paymentType: this.paymentForm.value.paymentType,
        paymentNumber: this.paymentForm.value.paymentNumber,
        bankId: this.paymentForm.value.bankId,
        supplierId: this.paymentForm.value.supplierId,
        typeOfPayee: this.paymentForm.value.typeOfPayee,
        remark: this.paymentForm.value.remark,
        createdById: this.user.userId,
        addPaymentDetails: this.paymentDetailList,
        employeeId: this.paymentForm.value.employeeId != null ? this.paymentForm.value.employeeId : "",
        otherBeneficiary: this.paymentForm.value.otherBeneficiary != null ? this.paymentForm.value.otherBeneficiary : "",
        beneficiaryAccountNumber:  this.paymentForm.value.beneficiaryAccountNumber != null ? this.paymentForm.value.beneficiaryAccountNumber : ""
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
      debugger;
      this.financeService.addPayments(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.paymentDetailList = [];
            this.addPaymentDetailList = new AddPaymentDetailDto();
           // this.goToPayments()
           this.paymentForm.reset();
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
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }


    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
  onRemove() {

    this.uploadedFiles.splice(0, this.uploadedFiles.length);


    this.messageService.add({ severity: 'error', summary: 'File Removed', detail: '' });
  }
  // closeModal() {
  //   this.activeModal.close();
  // }

  goToPayments() {

    this.routerService.navigateByUrl('/finance/payments')
  }

  newVendor(){
      let modalRef = this.modalService.open(AddVendorComponent, { size: 'lg', backdrop: 'static' })
      modalRef.result.then(()=>{
      });
      this.getSupplierDropDown();
  }

  onSupplierChange(vendorId: string){
    this.beneficiaryAccount = [];
    this.dropDownService.getVendorAccount(vendorId).subscribe({
      next: (res) => {
        this.beneficiaryAccount = res
      },
      error: (err) => {
        console.error(err)
      }

    })
  }

  onEmployeeChange(employeeId: string){
    this.beneficiaryAccount = [];
    this.dropDownService.getEmployeeAccount(employeeId).subscribe({
      next: (res) => {
        this.beneficiaryAccount = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  
  onAccountChange(accountId: string){
    this.paymentForm.value.beneficiaryAccountNumber =  this.beneficiaryAccount.find(x => x.id == accountId).reason
  }
}
