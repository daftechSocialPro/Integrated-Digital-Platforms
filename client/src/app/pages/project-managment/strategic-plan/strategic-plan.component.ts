import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StrategicPlanGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { AddStrategicPlanComponent } from './add-strategic-plan/add-strategic-plan.component';
import { UpdateStrategicPlanComponent } from './update-strategic-plan/update-strategic-plan.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-strategic-plan',
  templateUrl: './strategic-plan.component.html',
  styleUrls: ['./strategic-plan.component.css']
})
export class StrategicPlanComponent implements OnInit {
  
  strategicPlans! : StrategicPlanGetDto[]

  ngOnInit(): void {

    this.getStragegicPlan()
    
  }

  constructor (private pmService : ProjectmanagementService,
               private modalService:NgbModal,
               private confirmationService: ConfirmationService,
               private messageService: MessageService){}


  getStragegicPlan (){
    this.pmService.getStragegicPlan() .subscribe({
      next:(res)=>{     
          this.strategicPlans = res       
      
      },error:(err)=>{
  
      }
    })
  }
  addStrategicPlan(){

    let modalRef = this.modalService.open(AddStrategicPlanComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getStragegicPlan()
    })
  }

  updateStrategicPlan (department :StrategicPlanGetDto){
    let modalRef = this.modalService.open(UpdateStrategicPlanComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.strategicPlan  = department
    modalRef.result.then(()=>{
      this.getStragegicPlan()
    });
  }

deleteStrategicPlan(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pmService.deleteStrategicPlan(id).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getStragegicPlan();
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
