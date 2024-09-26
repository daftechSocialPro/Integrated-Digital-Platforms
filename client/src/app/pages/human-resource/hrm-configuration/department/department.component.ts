import { Component, OnInit } from '@angular/core';

import { DepartmentGetDto } from 'src/app/model/HRM/IDepartmentDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrmService } from 'src/app/services/hrm.service';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';

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

  constructor (private hrmService : HrmService,private modalService:NgbModal){}


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
