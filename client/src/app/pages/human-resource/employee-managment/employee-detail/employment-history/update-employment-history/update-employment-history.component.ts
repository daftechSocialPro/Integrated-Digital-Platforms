import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { EmployeeHistoryDto, EmployeeHistoryPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { toastPayload, CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employment-history',
  templateUrl: './update-employment-history.component.html',
  styleUrls: ['./update-employment-history.component.css']
})
export class UpdateEmploymentHistoryComponent implements OnInit {

 
  @Input() employeeHistory! :EmployeeHistoryDto
 
  HistoryForm !: FormGroup;
  departments!: SelectList[];
  positions!: SelectList[];
  user ! : UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getDepartments()
    this.getPositions()
    this.HistoryForm.controls['departmentId'].setValue(this.employeeHistory.departmentId)
    this.HistoryForm.controls['positionId'].setValue(this.employeeHistory.positionId) 
    this.HistoryForm.controls['salary'].setValue(this.employeeHistory.salary)    
    this.HistoryForm.controls['startDate'].setValue(this.employeeHistory.startDate)
    this.HistoryForm.controls['endDate'].setValue(this.employeeHistory.endDate)

  }
  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService : MessageService
    ) {

      this.HistoryForm = this.formBuilder.group({        
       
        departmentId: [null, Validators.required],
        positionId: [null, Validators.required],
        salary: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required]
      })
     }

  getDepartments() {
    this.hrmService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res
      }
    })
  }

  getPositions() {
    this.hrmService.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
      }
    })
  }
  closeModal() {
    this.activeModal.close()
  }

  submit(){
    if (this.HistoryForm.valid){

      var employeeHistory : EmployeeHistoryPostDto={

        id:this.employeeHistory.id,
        departmentId : this.HistoryForm.value.departmentId,
        positionId : this.HistoryForm.value.positionId,
        salary : this.HistoryForm.value.salary,
        startDate : this.HistoryForm.value.startDate,
        endDate : this.HistoryForm.value.endDate,
        createdById : this.user.userId,
        employeeId : this.employeeHistory.employeeId
      }
      this.hrmService.updateEmployeeHistory(employeeHistory).subscribe(
        {
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
        }
      )

    }

  }

}
