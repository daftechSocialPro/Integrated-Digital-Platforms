import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AddComiteeComponent } from './add-comitee/add-comitee.component';
import { CommitteeView } from '../../../model/PM/committeeDto';
import { CommitteeEmployeeComponent } from './committee-employee/committee-employee.component';
import { UpdateCpmmitteeComponent } from './update-cpmmittee/update-cpmmittee.component';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-comittes',
  templateUrl: './comittes.component.html',
  styleUrls: ['./comittes.component.css']
})
export class ComittesComponent implements OnInit {
  
  committees : CommitteeView[]=[]
  constructor (
    private modalService : NgbModal,
    private pmService  : PMService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    
  ){}
  ngOnInit(): void {


   this.listCommittee()
  }

  listCommittee (){

    this.pmService.getComittee().subscribe({
      next:(res)=>{
        this.committees = res 

      }
    })
  }

  addCommitte(){

    let modalRef= this.modalService.open(AddComiteeComponent,{size:'md',backdrop:'static'})
    modalRef.result.then(()=>{

      this.listCommittee()
    })
  }

  employees(value : CommitteeView){

    let modalRef = this.modalService.open(CommitteeEmployeeComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.committee = value 
    modalRef.result.then(()=>{
      this.listCommittee()
    })


  }
  update(value : CommitteeView){

    let modalRef = this.modalService.open(UpdateCpmmitteeComponent,{size:'md',backdrop:'static'})
    modalRef.componentInstance.comitee = value
    modalRef.result.then(()=>{

      this.listCommittee()
    })
  }

  deleteCommittee(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this project team?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pmService.deleteCommittee(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.listCommittee();
            }
            else {
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
