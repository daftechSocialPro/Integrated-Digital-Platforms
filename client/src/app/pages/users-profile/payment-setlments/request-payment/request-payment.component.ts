import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { BudgetByActivityDto, IPaymentRequisitionPostDto } from 'src/app/pages/finance/payment-requisition/IPaymentRequisition';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-payment',
  templateUrl: './request-payment.component.html',
  styleUrls: ['./request-payment.component.css']
})
export class RequestPaymentComponent implements OnInit {

  paymentRequisitionForm!: FormGroup
  projectDropdowns:SelectList[]=[];
  activityDropDown:SelectList[]=[];
  purchaseRequests: SelectList[]=[];
  user: UserView;
  budgetByActivity:BudgetByActivityDto;

  paymentTypeList = [
    { name: "Transfer", value: 0 },
    { name: "Check", value: 1 },
    { name: "Cash", value: 2 },
  ]

  requsitionType = [
    { name: "Advance", value: 0 },
    { name: "PettyCash", value: 1 },
    { name: "Purchase", value: 2 },
  ]

  constructor(private formBuilder: FormBuilder,
   
    private dropdownService : DropDownService,
    private userService : UserService,
    private financeService : FinanceService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal) { }

    

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.paymentRequisitionForm = this.formBuilder.group({
      paymentType: ['',Validators.required],
      requsitionType: ['', Validators.required],
      purpose: ['', Validators.required],
      description: [''],
      ammount:['',Validators.required],
      projectId:[null],
      budgetLine:['',],
      activityId: [null,],
      purchaseRequestId: [null,]
    });
    this.getProjectDropdown()
  }




  getProjectDropdown (){
    this.dropdownService.getProjectDropDowns().subscribe({
      next:(res)=>{
        this.projectDropdowns = res;
      }
    })
  }

  getPurchaseRequestDropDown (){
    this.dropdownService.getAllPurchaseRequestDropDown().subscribe({
      next:(res)=>{
        this.purchaseRequests = res;
      }
    })
  }

getActivityByProject(projectId:any){
  this.dropdownService.getActivityByProjectid(projectId.value).subscribe({
    next:(res)=>{
      this.activityDropDown = res;
    }
  })
}

getBudgetByActivity(activityId: any){
  this.budgetByActivity = new BudgetByActivityDto(); 
  this.financeService.getBudgetByActivity(activityId.value).subscribe({
    next:(res)=>{
      this.budgetByActivity = res;
    }
  });
}

  submit() {
    
    if (this.paymentRequisitionForm.valid) {
      var paymentRequisition: IPaymentRequisitionPostDto = {
        ammount: this.paymentRequisitionForm.value.ammount,
        budgetLine: this.paymentRequisitionForm.value.budgetLine,
        description: this.paymentRequisitionForm.value.description,
        paymentType :   parseInt(this.paymentRequisitionForm.value.paymentType),  
        requsitionType: parseInt(this.paymentRequisitionForm.value.requsitionType),
        purpose : this.paymentRequisitionForm.value.purpose,
        createdById:  this.user.userId  
      }
      if(this.paymentRequisitionForm.value.purchaseRequestId != null ){
        paymentRequisition.purchaseRequestId = this.paymentRequisitionForm.value.purchaseRequestId
      }
      if(this.paymentRequisitionForm.value.projectId != null ){
        paymentRequisition.projectId = this.paymentRequisitionForm.value.projectId
      }
      if(this.paymentRequisitionForm.value.activityId != null ){
        paymentRequisition.activityId = this.paymentRequisitionForm.value.activityId
      }

      if(this.budgetByActivity.usedBudget + paymentRequisition.ammount > this.budgetByActivity.allocatedBudget){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There is no enough budget' });
      }
      else{
      this.financeService.addPaymentRequisition(paymentRequisition).subscribe({

        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
          }
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
        }
      }
      );
    }
    }

  }
  closeModal() {
    this.activeModal.close()
  }




}