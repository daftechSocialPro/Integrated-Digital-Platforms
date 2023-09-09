import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { EmployeeEducationGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeEducationComponent } from './add-employee-education/add-employee-education.component';
import { UpdateEmployeeEducationComponent } from './update-employee-education/update-employee-education.component';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.css']
})
export class EmployeeEducationComponent implements OnInit {


  @Input() employeeId!: string;
  educations : any 
  position: string = 'center';

  ngOnInit(): void {
    this.getEmployeeEducation()
  }

  constructor(
    private hrmService : HrmService,
    private modalService : NgbModal,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService){}

  getEmployeeEducation(){
    this.hrmService.getEmployeeEducation(this.employeeId).subscribe({
      next:(res)=>{
        this.educations = res 
      }
    })
  }

  addEmploymentEducation (){
    let modalRef = this.modalService.open(AddEmployeeEducationComponent,{size:'lg',backdrop:'static'})
   modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(()=>{
      this.getEmployeeEducation()
    })
  }

  updateEmploymentEducation(employeeEducation: EmployeeEducationGetDto){
    let modalRef = this.modalService.open(UpdateEmployeeEducationComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.employeeEducation = employeeEducation
    modalRef.result.then(()=>{
      this.getEmployeeEducation()
    })
  }


  deleteEmployeeEducation(EducationId : string) {
  
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.hrmService.deleteEmployeeEducation(EducationId).subscribe({
            next:(res)=>{
  
              if(res.success){
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
               this.getEmployeeEducation()
              }
              else{
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
              }
            }, error: (err) => {
    
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
    
       
            }
          })
            
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        },
        key: 'positionDialog'
    });
}


}
