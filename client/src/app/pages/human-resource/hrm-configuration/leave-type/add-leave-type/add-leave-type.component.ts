import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LeaveTypePostDto } from 'src/app/model/HRM/ILeaveDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.css']
})
export class AddLeaveTypeComponent implements OnInit {

 
  LeaveTypeForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser()   
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private toastService : CommonService,
    private userService : UserService,
    private messageService: MessageService) { 

      this.LeaveTypeForm = this.formBuilder.group({
        name: ['', Validators.required],
        leaveCategory: ['',Validators.required],
        minDate: ['',Validators.required],
        maxDate: ['',Validators.required],
        incrementValue: ['',Validators.required],
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.LeaveTypeForm.valid){

      var LeaveTypePost : LeaveTypePostDto ={
        
        name : this.LeaveTypeForm.value.name ,
        leaveCategory : this.LeaveTypeForm.value.leaveCategory,
        minDate : this.LeaveTypeForm.value.minDate,
        maxDate : this.LeaveTypeForm.value.maxDate,
        incrementValue : this.LeaveTypeForm.value.incrementValue,
        createdById : this.user.userId

      }

      this.hrmService.addLeaveType(LeaveTypePost).subscribe({
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
