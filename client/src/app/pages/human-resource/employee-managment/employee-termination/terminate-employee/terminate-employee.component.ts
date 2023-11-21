import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DepartmentPostDto } from 'src/app/model/HRM/IDepartmentDto';
import { TerminationRequesterDto } from 'src/app/model/HRM/IResignationDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-terminate-employee',
  templateUrl: './terminate-employee.component.html',
  styleUrls: ['./terminate-employee.component.css']
})
export class TerminateEmployeeComponent implements OnInit {

 @Input() empId !: string
  terminateForm!: FormGroup;
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

      this.terminateForm = this.formBuilder.group({
        remark: ['', Validators.required],
        blacListed: ['']
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.terminateForm.valid){

      var terminatePost : TerminationRequesterDto ={
        
        employementDetailId : this.empId,
        remark : this.terminateForm.value.remark,
        blacListed: Boolean(this.terminateForm.value.blacListed)
      }

      this.hrmService.terminateRequest(terminatePost).subscribe({
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
