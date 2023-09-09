import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveTypeGetDto } from 'src/app/model/HRM/ILeaveDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { UpdateLeaveTypeComponent } from './update-leave-type/update-leave-type.component';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  
  LeaveTypes! : LeaveTypeGetDto[]

  ngOnInit(): void {

    this.getLeaveTypes()
    
  }

  constructor (private hrmService : HrmService,private modalService:NgbModal){}


  getLeaveTypes (){
    this.hrmService.getLeaveTypes().subscribe({
      next:(res)=>{
      
          this.LeaveTypes = res
        
      
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addLeaveType(){

    let modalRef = this.modalService.open(AddLeaveTypeComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getLeaveTypes()
    })
  }

  updateLeaveType (LeaveType :LeaveTypeGetDto){


    let modalRef = this.modalService.open(UpdateLeaveTypeComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.LeaveType = LeaveType

    modalRef.result.then(()=>{

      this.getLeaveTypes()
    })

  }




}
