import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LeaveTypeGetDto } from 'src/app/model/HRM/ILeaveDto';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-update-leave-type',
  templateUrl: './update-leave-type.component.html',
  styleUrls: ['./update-leave-type.component.css']
})
export class UpdateLeaveTypeComponent implements OnInit {

  @Input() LeaveType !: LeaveTypeGetDto

  LeaveTypeForm!: FormGroup;

  ngOnInit(): void {

    this.LeaveTypeForm = this.formBuilder.group({
      name: [this.LeaveType.name, Validators.required],
      leaveCategory: [this.LeaveType.leaveCategory,Validators.required],
      minDate: [this.LeaveType.minDate,Validators.required],
      maxDate: [this.LeaveType.maxDate,Validators.required],
      incrementValue: [this.LeaveType.incrementValue,Validators.required],
    })
  }

  

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private messageService: MessageService) {

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.LeaveTypeForm.valid) {

      var LeaveTypeUpdate: LeaveTypeGetDto = {

        name : this.LeaveTypeForm.value.name ,
        leaveCategory : this.LeaveTypeForm.value.leaveCategory,
        minDate : this.LeaveTypeForm.value.minDate,
        maxDate : this.LeaveTypeForm.value.maxDate,
        incrementValue : this.LeaveTypeForm.value.incrementValue,
        id: this.LeaveType.id
      }

      this.hrmService.updateLeaveType(LeaveTypeUpdate).subscribe({
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

