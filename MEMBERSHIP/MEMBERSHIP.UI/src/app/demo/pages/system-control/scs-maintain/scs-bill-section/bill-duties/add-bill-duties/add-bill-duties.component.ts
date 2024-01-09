import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { IBillEmpDutiesDto } from 'src/models/system-control/IBillEmpDutiesDto';
import { ScsMaintainService } from 'src/app/services/system-control/scs-maintain.service';
import { BillOfficers } from 'src/models/ResponseMessage.Model';
@Component({
  selector: 'app-add-bill-duties',
  templateUrl: './add-bill-duties.component.html',
  styleUrls: ['./add-bill-duties.component.scss']
})
export class AddBillDutiesComponent {

  @Input() recordNo: number
  billEmpDuties: IBillEmpDutiesDto
  billEmpDutiesForm!: FormGroup
  billOfficers : BillOfficers[]
  isDisabled:boolean
  
  constructor(
    private activeModal : NgbActiveModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService : ScsMaintainService,
    private formBuilder:FormBuilder){}

    ngOnInit(): void {

      
  
  
      if (this.recordNo) {
      this.billEmpDutiesForm = this.formBuilder.group({
  
        empID: [{value:'',disabled:true},, Validators.required],       
        duties: ['', Validators.required]
        
      })
  
        this.isDisabled = true
  
        this.controlService.getBillEmpDutyForUpdate(this.recordNo).subscribe({
          next: (res) => {
            console.log(res)
            this.billEmpDuties = res
    
            this.billEmpDutiesForm.controls['empID'].setValue(this.billEmpDuties.empID)         
            this.billEmpDutiesForm.controls['duties'].setValue(this.billEmpDuties.duties)
            console.log(this.billEmpDutiesForm.value)
          }
        })
  
      }else{

      this.billEmpDutiesForm = this.formBuilder.group({
  
        empID: ['', Validators.required],       
        duties: ['', Validators.required]
        
      })
  
      }
  
  
  
  
      this.getBillDuties()
  
    }


  getBillDuties (){

    this.controlService.getBillOfficerHavingNoDuty().subscribe({
      next:(res)=>{
        this.billOfficers = res 
      }
    })
  }


  
  submit(){

    if( this.billEmpDutiesForm.valid){
  
      let addBillEmpDuties : IBillEmpDutiesDto={
        recordno:2,       
        empID   : this.billEmpDutiesForm.value.empID,
        name    : '',
        duties  : this.billEmpDutiesForm.value.duties
        
      }
  
      this.controlService.addBillEmpDuties(addBillEmpDuties).subscribe({
        next:(res)=>{
  
          if (res.success){
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail:res.message });
            
            this.closeModal()
  
          }else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:res.message });
  
          }
  
        },error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err.message });
  
        }
      })
  
  
    }
    else {
  
  
    }
  }


  update() {
    if (this.billEmpDutiesForm.valid) {

      let updateBillEmpDuties: IBillEmpDutiesDto = {
        recordno: this.billEmpDuties.recordno,
        empID   : this.billEmpDutiesForm.value.empID,
        name    : '',
        duties  : this.billEmpDutiesForm.value.duties,
      }

      this.controlService.updateBillEmpDuties(updateBillEmpDuties).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })


    }
    else {


    }

  }

  closeModal() {

    this.activeModal.close()

  }


}


