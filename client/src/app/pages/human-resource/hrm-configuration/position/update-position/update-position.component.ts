import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { PositionGetDto } from 'src/app/model/HRM/IPositionDto';
import { UserView } from 'src/app/model/user';
import { toastPayload, CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrls: ['./update-position.component.css']
})
export class UpdatePositionComponent implements OnInit {

  @Input() Position !: PositionGetDto

  PositionForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {

    this.PositionForm = this.formBuilder.group({
      PositionName: [this.Position.positionName, Validators.required],
      JobTitle: [this.Position.jobTitle]      
  })
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private messageService : MessageService) {  
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.PositionForm.valid){

      var PositionUpdate : PositionGetDto ={
        
        positionName : this.PositionForm.value.PositionName,
        jobTitle : this.PositionForm.value.JobTitle,
        id : this.Position.id
      }

      this.hrmService.updatePosition(PositionUpdate).subscribe({
        next:(res)=>{
          if (res.success){
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
          
            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
          
          }
        },
        error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
        }
      })

    }

  }

}