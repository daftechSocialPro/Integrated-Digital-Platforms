import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ITraineeGetDto } from 'src/app/model/Training/TraineeDto';
import { ITrainerGetDto } from 'src/app/model/Training/TrainerDto';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { ITrainingReportGetDto, ITrainingReportPostDto } from 'src/app/model/Training/TrainingReportDto';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-report-form',
  templateUrl: './training-report-form.component.html',
  styleUrls: ['./training-report-form.component.css'],

})
export class TrainingReportFormComponenT implements OnInit {

  @Input() traininggId !: string
  @Input() TrainingTitle !: string

  training !: ITrainingGetDto
  trainers: ITrainerGetDto[] = []
  trainingId!: string
  trainingReportForm !: FormGroup

  trainingReport !: ITrainingReportGetDto


  ngOnInit(): void {

    this.trainingId = this.route.snapshot.paramMap.get('trainingId')!

    if(this.trainingId){
    this.getSingleTraining(this.trainingId)
    this.getTrainer(this.trainingId)
    this.getTrainingreport(this.trainingId)}
    else{
      this.getSingleTraining(this.traininggId)
      this.getTrainer(this.traininggId)
      this.getTrainingreport(this.traininggId)
    }

  }
  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    this.trainingReportForm = this.formBuilder.group({

      Objective: ['', Validators.required],
      Contribution: ['', Validators.required],
      TraineesDescription: ['', Validators.required],
      TopicsCovered: ['', Validators.required],
      Challenges: ['', Validators.required],
      LessonsLearned: ['', Validators.required],
      Summary: ['', Validators.required],
      PrePostSummary: ['', Validators.required]

    })


  }

  closeModal() { }


  getSingleTraining(trainingId:string) {

    this.trainingService.getSingleTraining(trainingId).subscribe({
      next: (res) => {
        this.training = res
        console.log(res)
      }
    })

  }

  getTrainer(trainingId:string) {
    this.trainingService.getTrainerList(trainingId).subscribe({
      next: (res) => {
        this.trainers = res

        console.log(this.trainers)
      }
    })
  }

  getTrainingreport(trainingId:string) {
    this.trainingService.getTrainingReport(trainingId).subscribe({
      next: (res) => {
        if (res) {

          this.trainingReport = res
          this.trainingReportForm.controls['Objective'].setValue(res.objective)
          this.trainingReportForm.controls['Contribution'].setValue(res.contribution)
          this.trainingReportForm.controls['TraineesDescription'].setValue(res.traineesDescription)
          this.trainingReportForm.controls['TopicsCovered'].setValue(res.topicsCoverd)
          this.trainingReportForm.controls['Challenges'].setValue(res.challenges)
          this.trainingReportForm.controls['LessonsLearned'].setValue(res.lessonsLearned)
          this.trainingReportForm.controls['Summary'].setValue(res.summary)
          this.trainingReportForm.controls['PrePostSummary'].setValue(res.prePostSummary)

        }
      }
    })
  }
  submit(reportStatus: string) {

    if (this.trainingReportForm.valid) {

      let trainingReport: ITrainingReportPostDto = {

        Objective: this.trainingReportForm.value.Objective,
        Contribution: this.trainingReportForm.value.Contribution,
        TraineesDescription: this.trainingReportForm.value.TraineesDescription,
        TopicsCoverd: this.trainingReportForm.value.TopicsCovered,
        Challenges: this.trainingReportForm.value.Challenges,
        LessonsLearned: this.trainingReportForm.value.LessonsLearned,
        Summary: this.trainingReportForm.value.Summary,
        PrePostSummary: this.trainingReportForm.value.PrePostSummary,
        TrainingId: this.trainingId,
        ReportStatus: reportStatus,
        Id: this.trainingReport && this.trainingReport.id

      }


      console.log(trainingReport)
      this.trainingService.createTrainingReport(trainingReport).subscribe({

        next: (res) => {
          if (res.success) {

            this.messageService.add({ severity: 'success', summary: `Successfully ${reportStatus}ed`, detail: res.message })
            window.location.reload()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!! ', detail: res.message })

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error ', detail: err })

        }

      })

    }
  }

  


}
