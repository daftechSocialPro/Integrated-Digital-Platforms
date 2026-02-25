import { Component, OnInit } from '@angular/core';

import { DepartmentGetDto } from 'src/app/model/HRM/IDepartmentDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrmService } from 'src/app/services/hrm.service';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  filterValue!:string
  departments! : DepartmentGetDto[]

  ngOnInit(): void {

    this.getDepartments()
    
  }

  constructor (private hrmService : HrmService,private modalService:NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService){}


  getDepartments (){
    this.hrmService.getDepartments().subscribe({
      next:(res)=>{
      
          this.departments = res
        
      
      },error:(err)=>{
    
      }
    })
  }
  addDepartment(){

    let modalRef = this.modalService.open(AddDepartmentComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getDepartments()
    })
  }

  updateDepartment (department :DepartmentGetDto){
    let modalRef = this.modalService.open(UpdateDepartmentComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.department = department
    modalRef.result.then(()=>{
      this.getDepartments()
    });
  }

  deleteDepartment(department: DepartmentGetDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this department?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.checkDepartmentDependency(department.id!).subscribe({
          next: (depRes) => {
            if (depRes.hasDependencies) {
              this.confirmationService.confirm({
                message: `${depRes.message} It will delete those datas also. Are you absolutely sure you want to remove the data?`,
                header: 'Warning: Linked Data Found',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                  this.forceDeleteDepartment(department.id!);
                }
              });
            } else {
              this.forceDeleteDepartment(department.id!);
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to check department dependencies" });
          }
        });
      }
    });
  }

  forceDeleteDepartment(id: string) {
    this.hrmService.deleteDepartment(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
          this.getDepartments();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to delete department" });
      }
    });
  }


  get filteredDepartments(): any[] {
    if (!this.filterValue) {
        return this.departments;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.departments.filter((department: any) => {
        const departmentName = department.departmentName.toLowerCase();
        const amharicName = department.amharicName.toLowerCase();
        
        return departmentName.includes(filterText) || amharicName.includes(filterText);
    });
}

}
