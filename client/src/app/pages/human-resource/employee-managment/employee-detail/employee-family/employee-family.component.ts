import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { EmployeeFamilyGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeFamilyComponent } from './add-employee-family/add-employee-family.component';
import { UpdateEmployeeFamilyComponent } from './update-employee-family/update-employee-family.component';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrls: ['./employee-family.component.css']
})
export class EmployeeFamilyComponent implements OnInit {


  @Input() employeeId!: string;
  families : any 
  position: string = 'center';

  ngOnInit(): void {
    this.getEmployeeFamily()
  }

  constructor(
    private hrmService : HrmService,
    private modalService : NgbModal,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService){}

  getEmployeeFamily(){
    this.hrmService.getEmployeeFamily(this.employeeId).subscribe({
      next:(res)=>{
        this.families = res 
      }
    })
  }

  addEmploymentFamily (){
    let modalRef = this.modalService.open(AddEmployeeFamilyComponent,{size:'lg',backdrop:'static'})
   modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(()=>{
      this.getEmployeeFamily()
    })
  }

  updateEmploymentFamily(employeeFamily: EmployeeFamilyGetDto){
    let modalRef = this.modalService.open(UpdateEmployeeFamilyComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.employeeFamily = employeeFamily
    modalRef.result.then(()=>{
      this.getEmployeeFamily()
    })
  }


  deleteEmployeeFamily(FamilyId : string) {
  
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.hrmService.deleteEmployeeFamily(FamilyId).subscribe({
            next:(res)=>{
  
              if(res.success){
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
               this.getEmployeeFamily()
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
