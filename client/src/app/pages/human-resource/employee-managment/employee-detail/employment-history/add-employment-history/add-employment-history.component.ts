import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { EmployeeHistoryPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employment-history',
  templateUrl: './add-employment-history.component.html',
  styleUrls: ['./add-employment-history.component.css']
})
export class AddEmploymentHistoryComponent implements OnInit {

  @Input() employeeId! : string

  HistoryForm !: FormGroup;
  departments!: SelectList[];
  positions!: SelectList[];
  user ! : UserView;
  today: Date = new Date();
  minDate: Date = new Date();
  
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getDepartments()
    this.getPositions()
  }

  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService: MessageService,
    private dropService: DropDownService
    ) {

      this.HistoryForm = this.formBuilder.group({  
        departmentId: [null, Validators.required],
        positionId: [null, Validators.required],
        salary: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null],
        sourceOfSalary:[null,Validators.required],
        remark : [null,Validators.required]
      })

     }

  getDepartments() {
    this.dropService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res
      }
    })
  }

  getPositions() {
    this.dropService.getPositionsDropdown().subscribe({
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
        departmentId : this.HistoryForm.value.departmentId,
        positionId : this.HistoryForm.value.positionId,
        salary : this.HistoryForm.value.salary,
        startDate : this.HistoryForm.value.startDate,
        endDate : this.HistoryForm.value.endDate,
        createdById : this.user.userId,
        employeeId : this.employeeId,
        sourceOfSalary : this.HistoryForm.value.sourceOfSalary,
        remark : this.HistoryForm.value.remark
      }

      this.hrmService.addEmployeeHistory(employeeHistory).subscribe(
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

  getminEndDate(date: any){
    this.minDate = date;
}

}
