import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ITraineeGetDto } from 'src/app/model/Training/TraineeDto';
import { ITrainerGetDto } from 'src/app/model/Training/TrainerDto';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { ITrainingReportGetDto, ITrainingReportPostDto } from 'src/app/model/Training/TrainingReportDto';
import { CommonService } from 'src/app/services/common.service';
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
  uploadedFiles: File[] = []
  uploadedFiles2: File[] = []
  imageUrls: string[] = [];
  imageObject: Array<object> = [];
  ngOnInit(): void {

    this.trainingId = this.route.snapshot.paramMap.get('trainingId')!

    if (this.trainingId) {
      this.getSingleTraining(this.trainingId)
      this.getTrainer(this.trainingId)
      this.getTrainingreport(this.trainingId)
    }
    else {
      this.getSingleTraining(this.traininggId)
      this.getTrainer(this.traininggId)
      this.getTrainingreport(this.traininggId)
    }

  }
  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
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


  getSingleTraining(trainingId: string) {

    this.trainingService.getSingleTraining(trainingId).subscribe({
      next: (res) => {
        this.training = res
        console.log(res)
      }
    })

  }

  getTrainer(trainingId: string) {
    this.trainingService.getTrainerList(trainingId).subscribe({
      next: (res) => {
        this.trainers = res

        console.log(this.trainers)
      }
    })
  }

  getTrainingreport(trainingId: string) {
    this.trainingService.getTrainingReport(trainingId).subscribe({
      next: (res) => {
        if (res) {

          console.log(res)
          this.trainingReport = res
          this.trainingReportForm.controls['Objective'].setValue(res.objective)
          this.trainingReportForm.controls['Contribution'].setValue(res.contribution)
          this.trainingReportForm.controls['TraineesDescription'].setValue(res.traineesDescription)
          this.trainingReportForm.controls['TopicsCovered'].setValue(res.topicsCoverd)
          this.trainingReportForm.controls['Challenges'].setValue(res.challenges)
          this.trainingReportForm.controls['LessonsLearned'].setValue(res.lessonsLearned)
          this.trainingReportForm.controls['Summary'].setValue(res.summary)
          this.trainingReportForm.controls['PrePostSummary'].setValue(res.prePostSummary)

          this.getAttachemnt(res.images)
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


      }
      const formData = new FormData();

      for (let key in trainingReport) {
        formData.append(key, (trainingReport as any)[key]);
      }
      for (let key in this.uploadedFiles) {

        formData.append("Attachments", (this.uploadedFiles as any)[key])
      }
      for (let key in this.uploadedFiles2) {
        formData.append("Images", (this.uploadedFiles2 as any)[key])

      }


      if (this.trainingReport) {
        formData.append("Id", this.trainingReport.id)
      }


      console.log(formData)

if (reportStatus=='SUBMITTED'){

  

    this.confirmationService.confirm({
      message: 'Do you want to Sumbit this training report Form?',
      header: 'Training Report Form status !',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.trainingService.createTrainingReport(formData).subscribe({

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
  



}else{


      this.trainingService.createTrainingReport(formData).subscribe({

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

  onUpload(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedFiles.push(file);
    }
  }

  removeFile(file: File): void {
    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }
  
  onUpload2(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedFiles2.push(file);
      this.getImageDataUrl(file);
    }
  }

  removeFile2(file: File): void {
    const index = this.uploadedFiles2.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles2.splice(index, 1);
      this.imageUrls.splice(index, 1);
    }
  }
 
  



  getImage(url: string) {


    return this.commonService.createImgPath(url)
  }





  getAttachemnt(attachments: string[]) {


    var id = this.generateRandomId()

    attachments.forEach(element => {

      var imageArray = {
        image: this.getImage(element),
        thumbImage: this.getImage(element),
        alt: id,
        title: id,

      }
      this.imageObject.push(imageArray)
    }

    );

  }
  generateRandomId(): string {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(16);
  }

  getImageDataUrl(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imageUrl = event.target.result;
      this.imageUrls.push(imageUrl);
    };
    reader.readAsDataURL(file);
  }

  getImageUrl(image: File): string {
    const index = this.uploadedFiles2.indexOf(image);
    if (index !== -1) {
      return this.imageUrls[index];
    }
    return '';
  }
}
