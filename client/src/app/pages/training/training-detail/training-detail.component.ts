import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';
import { AddTrainingListComponent } from '../add-training-list/add-training-list.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {

  trainingId!: string
  actId!:string
  planId!:string 

  training !: ITrainingGetDto
  ngOnInit(): void {

    this.trainingId = this.router.snapshot.paramMap.get('id')!
    this.actId = this.router.snapshot.paramMap.get('actId')!
    this.planId = this.router.snapshot.paramMap.get('planId')!

    this.getSingleTraining()
  }
  constructor(
    private trainingService : TrainingService,
    private confirmationService:ConfirmationService,
    private messageService : MessageService,
    private modalService : NgbModal,
    private router: ActivatedRoute,private route : Router) { }


  goToActivity(){
    this.route.navigate(['/pm/activityDetail', this.actId, this.planId  ]);
  }

  goToTrainingDashboard (){
    this.route.navigate(['pm/training-dashboard' ]);
  }

  
  getSingleTraining() {
    this.trainingService.getSingleTraining(this.trainingId).subscribe({
      next: (res) => {
        this.training = res
        console.log(res)
      }
    })
  }

  editTraining () {

    let modalRef = this.modalService.open(AddTrainingListComponent,{backdrop:'static',size:'lg'})
    modalRef.componentInstance.training = this.training

    modalRef.result.then(()=>{
      this.getSingleTraining()
    })
  }

  DeleteTraining( ){

    
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete Training , All Trainers and Trainee Data will also be Deleted ??',
      header: 'Delete Approval !',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.trainingService.DeleteTraining(this.trainingId).subscribe({
            next:(res)=>{
              if (res.success){
                this.messageService.add({ severity: 'success', summary: 'Successfully Deleted', detail: res.message });
               this.route.navigateByUrl('/pm/training-dashboard')
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Somehting went wrong !!!', detail: res.message });
              }
            },error:(err)=>{
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err.message });
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
