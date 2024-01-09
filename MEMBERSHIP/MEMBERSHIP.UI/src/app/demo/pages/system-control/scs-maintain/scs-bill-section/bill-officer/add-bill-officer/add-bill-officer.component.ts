import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { IBillSectionDto } from 'src/models/system-control/IBillSectionDto';
import { ScsMaintainService } from 'src/app/services/system-control/scs-maintain.service';
import { SelectList } from 'src/models/ResponseMessage.Model';

@Component({
  selector: 'app-add-bill-officer',
  templateUrl: './add-bill-officer.component.html',
  styleUrls: ['./add-bill-officer.component.scss']
})
export class AddBillOfficerComponent implements OnInit {

  @Input() billSection: IBillSectionDto
  billSectionForm!: FormGroup;
  employees : SelectList[]
  
  constructor(
    private activeModal : NgbActiveModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService : ScsMaintainService,
    private formBuilder:FormBuilder){}

    ngOnInit(): void {

      if(this.billSection){
        this.billSectionForm = this.formBuilder.group({
          empID : [this.billSection.empID,Validators.required],
         
        })
      }
      else{
        this.billSectionForm = this.formBuilder.group({
          empID : ['',Validators.required],
       
        
        })
      }

      this.getEmployees()
      
    
  }


  getEmployees (){

    this.controlService.getBillOfficerWithNoUser().subscribe({
      next:(res)=>{
        this.employees = res 
      }
    })
  }
  
  submit(){

    if( this.billSectionForm.valid){
  
      let addBillSection : IBillSectionDto={
        empID : this.billSectionForm.value.empID,
        name : this.employees.filter(x=>x.empId==this.billSectionForm.value.empID)[0].name,
        gender : '',
        position : '',
        
      }
  
      this.controlService.addBillOfficer(addBillSection).subscribe({
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
    if (this.billSectionForm.valid) {

      let updateBillSection: IBillSectionDto = {
        empID: this.billSectionForm.value.empID,
        name: this.billSectionForm.value.name,
        gender: this.billSectionForm.value.gender,
        position: this.billSectionForm.value.position,
      }

      this.controlService.updateBillOfficer(updateBillSection).subscribe({
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
