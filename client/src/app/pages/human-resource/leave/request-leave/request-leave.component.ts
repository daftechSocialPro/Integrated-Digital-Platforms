import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLeaveRequestComponent } from './add-leave-request/add-leave-request.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';

@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css']
})
export class RequestLeaveComponent implements OnInit {

 leaves:any[]=[]
 
  constructor(private modalService : NgbModal){}

  ngOnInit(): void {
    
  }

  requestLeave(){

    let modalRef = this.modalService.open(AddLeaveRequestComponent,{size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      
    })
  }

  addLeavebalance (){

    let modalRef = this.modalService.open(LeaveBalanceComponent,{size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      
    })
  }
}
