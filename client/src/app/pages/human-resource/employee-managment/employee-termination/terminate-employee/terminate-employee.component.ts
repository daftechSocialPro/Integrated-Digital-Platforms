import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DepartmentPostDto } from 'src/app/model/HRM/IDepartmentDto';
import { TerminationRequesterDto } from 'src/app/model/HRM/IResignationDto';
import { TerminatedEmployeeReplacmentDto } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { AssignReplacementComponent } from './assign-replacement/assign-replacement.component';

@Component({
  selector: 'app-terminate-employee',
  templateUrl: './terminate-employee.component.html',
  styleUrls: ['./terminate-employee.component.css']
})
export class TerminateEmployeeComponent implements OnInit {

 @Input() empId !: string
  terminateForm!: FormGroup;
  user !: UserView
  TerminatedEmployeeActivites : TerminatedEmployeeReplacmentDto[] = []
  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser()   
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private toastService : CommonService,
    private userService : UserService,
    private messageService: MessageService,
    private pmService: PMService,
    private modalService: NgbModal) { 

      this.terminateForm = this.formBuilder.group({
        remark: ['', Validators.required],
        blacListed: ['']
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  AssignReplacment() {

    let modalRef = this.modalService.open(AssignReplacementComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.TerminatedEmployeeActivites = this.TerminatedEmployeeActivites
  }
  submit (){
    

    if (this.terminateForm.valid){

      this.pmService.getTerminatedEmployeesActivies(this.empId).subscribe({
        next: (res) => {
          this.TerminatedEmployeeActivites = res
          if(this.TerminatedEmployeeActivites && this.TerminatedEmployeeActivites.length > 0){
            this.AssignReplacment()
          }
        }
      })
      // return;

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
