import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeSupervisorsDto } from 'src/app/model/HRM/IEmployeeSupervisorDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AssignSupervisorComponent } from './assign-supervisor/assign-supervisor.component';

@Component({
  selector: 'app-employee-supervisors',
  templateUrl: './employee-supervisors.component.html',
  styleUrls: ['./employee-supervisors.component.css']
})
export class EmployeeSupervisorsComponent implements OnInit {
  
  employeeSupervisors! : EmployeeSupervisorsDto[]

  ngOnInit(): void {
    this.getEmployeeSupervisors()
  }

  constructor (private hrmService : HrmService,private modalService:NgbModal){}


  getEmployeeSupervisors (){
    this.hrmService.getEmployeeSupervisors().subscribe({
      next:(res)=>{
          this.employeeSupervisors = res
      },error:(err)=>{
        console.log(err)
      }
    });
  }

  addNew(){
    let modalRef = this.modalService.open(AssignSupervisorComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getEmployeeSupervisors()
    })
  }

 

}
