import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';
import { AddTrainingListComponent } from '../add-training-list/add-training-list.component';
import { TrainerListComponent } from '../trainer-list/trainer-list.component';
import { TraineesFormComponent } from '../trainees-form/trainees-form.component';
import { TrainingReportFormComponenT } from '../training-report-form/training-report-form.component';
import { Route, Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css'],
})
export class TrainingListComponent implements OnInit {
  @Input() activityId!: string;
  @Input() planId!: string;
  trainingList: ITrainingGetDto[] = [];

  ngOnInit(): void {
    this.getTrainingList();
  }

  constructor(
    private trainingService: TrainingService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  getTrainingList() {
    this.trainingService.getTrainings(this.activityId).subscribe({
      next: (res) => {
        this.trainingList = res;
      },
    });
  }

  addTraining() {
    let modalRef = this.modalService.open(AddTrainingListComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.activityId = this.activityId;
    modalRef.result.then(() => {
      this.getTrainingList();
    });
  }

  viewTrainers(trainingId: string, trainingTitle: string) {
    let modalRef = this.modalService.open(TrainerListComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.trainingId = trainingId;
    modalRef.componentInstance.TrainingTitle = trainingTitle;
  }
  viewTrainees(trainingId: string, trainingTitle: string) {
    let modalRef = this.modalService.open(TraineesFormComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.traininggId = trainingId;
    modalRef.componentInstance.TrainingTitle = trainingTitle;
  }

  viewTrainingReport(trainingId: string, trainingTitle: string) {
    let modalRef = this.modalService.open(TrainingReportFormComponenT, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.traininggId = trainingId;
    modalRef.componentInstance.TrainingTitle = trainingTitle;
  }

  toTrainingDetail(trainingId: string) {
    this.router.navigate([
      'pm/training-detail',
      trainingId,
      this.activityId,
      this.planId,
    ]);
  }

  editTraining(training: any) {
    let modalRef = this.modalService.open(AddTrainingListComponent, {
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.componentInstance.training = training;

    modalRef.result.then(() => {
      this.getTrainingList();
    });
  }

  DeleteTraining(trainingId: string) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to Delete Training , All Trainers and Trainee Data will also be Deleted ??',
      header: 'Delete Approval !',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.trainingService.DeleteTraining(trainingId).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Deleted',
                detail: res.message,
              });
              this.getTrainingList();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Somehting went wrong !!!',
                detail: res.message,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: err.message,
            });
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }
}
