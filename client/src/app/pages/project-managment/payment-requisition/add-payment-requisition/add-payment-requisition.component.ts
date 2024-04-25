import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { StrategicPlanPostDto } from 'src/app/model/PM/StrategicPlanDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { IPaymentRequisitionPostDto } from '../IPaymentRequisition';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-add-payment-requisition',
  templateUrl: './add-payment-requisition.component.html',
  styleUrls: ['./add-payment-requisition.component.css']
})
export class AddPaymentRequisitionComponent implements OnInit {

  paymentRequisitionForm!: FormGroup
  projectDropdowns:SelectList[]=[]
  user: UserView

  constructor(private formBuilder: FormBuilder,
   
    private dropdownService : DropDownService,
    private userService : UserService,
    private projectService : PMService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal) { }

    

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();


    this.paymentRequisitionForm = this.formBuilder.group({
      date: ['',Validators.required],
      name: ['', Validators.required],
      purposeOfRequest: ['', Validators.required],
      amountInWord:['',Validators.required],
      amount:['',Validators.required],
      projectId:['',Validators.required],
      budgetReference:['',Validators.required],
      pageNumber:[''],
      checkNumber:['',Validators.required]    

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
  submit() {

    if (this.paymentRequisitionForm.valid) {

      var paymentRequisition: IPaymentRequisitionPostDto = {

        date: this.paymentRequisitionForm.value.date,
        name: this.paymentRequisitionForm.value.name,
        purposeOfRequest: this.paymentRequisitionForm.value.purposeOfRequest,
        amountInWord : this.paymentRequisitionForm.value.amountInWord,  
        amount:this.paymentRequisitionForm.value.amount,
        projectId : this.paymentRequisitionForm.value.projectId,
        budgetReference : this.paymentRequisitionForm.value.budgetReference,
        pageNumber : this.paymentRequisitionForm.value.pageNumber,
        checkNumber : this.paymentRequisitionForm.value. checkNumber, 
        requestedById :this.user.employeeId,
        createdById:  this.user.userId  

      }


      this.projectService.addPaymentRequisition(paymentRequisition).subscribe({

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
  closeModal() {

    this.activeModal.close()
  }

}
