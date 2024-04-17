import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PurchaseInvoiceDetailPostDto, PurchaseInvoicePostDto } from 'src/app/model/Finance/IPurchaseInvoiceDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-purchase-invoice',
  templateUrl: './add-purchase-invoice.component.html',
  styleUrls: ['./add-purchase-invoice.component.css']
})
export class AddPurchaseInvoiceComponent implements OnInit {

  user!: UserView
  purchaseInvoiceForm!: FormGroup
  supplierDropDown!: SelectList[]
  purchaseRequestDropDown!: SelectList[]
  itemsDropDown!: SelectList[]
  purchaseInvoiceDetailList: PurchaseInvoiceDetailPostDto[]=[];
  addPurchaseInvoiceDetailList: PurchaseInvoiceDetailPostDto = new PurchaseInvoiceDetailPostDto();

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
    this.user= this.userService.getCurrentUser()
    this.getPurchaseRequestDropDown()
    this.getItemsDropDown()
    this.getSupplierDropDown()

    this.purchaseInvoiceForm = this.formBuilder.group({
      supplierId: ['', Validators.required],
      isPurchaseRequested: [false, Validators.required],
      purchaseRequestId: ['', Validators.required],
      vocherNo: ['', Validators.required],
      date: [null, Validators.required],
      remark: ['']
    })


  }

  getItemsDropDown(){
    this.dropDownService.getItemsDropDown().subscribe({
      next: (res) => {
          this.itemsDropDown = res;
      }
    });
  }

  getSupplierDropDown(){
    this.dropDownService.getVendorDropDown().subscribe({
      next: (res) => {
        this.supplierDropDown = res
      }
    })
  }

  getPurchaseRequestDropDown(){
    this.dropDownService.getAllPurchaseRequestDropDown().subscribe({
      next: (res) => {
        this.purchaseRequestDropDown = res
        console.log("purchaseRequestDropDown",res)
      }
    })

  }

  goToPurchaseInvoice(){

    this.routerService.navigateByUrl('/finance/purchaseinvoice')
  }

  removeData(ItemId: string) {
    this.purchaseInvoiceDetailList = this.purchaseInvoiceDetailList.filter(x => x.itemId != ItemId);
  }



  newRow() {
    if (this.addPurchaseInvoiceDetailList.itemId) {
      
      // this.itemsDropDown.some(x => {
      //   if (x.id == this.addPurchaseInvoiceDetailList.itemId) {
      //     this.addPurchaseInvoiceDetailList.itemName = x.name;
      //   }
      // });

      this.addPurchaseInvoiceDetailList.itemName = this.itemsDropDown.find((x)=>x.id==this.addPurchaseInvoiceDetailList.itemId).name
      

      this.purchaseInvoiceDetailList.unshift(this.addPurchaseInvoiceDetailList);
    }
    //this.items = "";
    this.addPurchaseInvoiceDetailList = new PurchaseInvoiceDetailPostDto();
  }


  submit(){
    if(this.purchaseInvoiceDetailList.length <= 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one Item detail', life: 3000 });
    }
    else{
      const addPurchaseInvoiceData: PurchaseInvoicePostDto ={
        supplierId: this.purchaseInvoiceForm.value.SupplierId,
        isPurchaseRequested: this.purchaseInvoiceForm.value.isPurchaseRequested,
        purchaseRequestId: this.purchaseInvoiceForm.value.purchaseRequestId,
        vocherNo: this.purchaseInvoiceForm.value.vocherNo,
        date: this.purchaseInvoiceForm.value.date,
        remark: this.purchaseInvoiceForm.value.remark,
        createdById: this.user.userId,
        purchaseInvoiceDetails: this.purchaseInvoiceDetailList

       } 
 
  
       this.financeService.addPurchaseInvoice(addPurchaseInvoiceData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.purchaseInvoiceDetailList = [];
            this.addPurchaseInvoiceDetailList = new PurchaseInvoiceDetailPostDto();
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

}
