import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ITrainingGetDto, ITrainingPostDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-add-training-list',
  templateUrl: './add-training-list.component.html',
  styleUrls: ['./add-training-list.component.css']
})
export class AddTrainingListComponent implements OnInit {

  @Input() activityId!: string
  @Input() training : ITrainingGetDto
  trainingForm!: FormGroup
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private messageService: MessageService

  ) {

  
  }

  ngOnInit(): void {

    if (this.training){
      this.trainingForm = this.formBuilder.group({
        Title: [this.training.title, Validators.required],
        // NameofOrganizaton: ['', Validators.required],
        // TypeofOrganization: ['', Validators.required],
        CourseVenue: [this.training.courseVenue, Validators.required],
        StartDate: [this.training.startDate.toString().split('T')[0], Validators.required],
        EndDate: [this.training.endDate.toString().split('T')[0], Validators.required],       
        allocatedCeu:[this.training.allocatedCEU,Validators.required]
  
      })

    }
    else{

      this.trainingForm = this.formBuilder.group({
        Title: ['', Validators.required],
        // NameofOrganizaton: ['', Validators.required],
        // TypeofOrganization: ['', Validators.required],
        CourseVenue: ['', Validators.required],
        StartDate: ['', Validators.required],
        EndDate: ['', Validators.required],
       
        allocatedCeu:['',Validators.required]
  
      })
    }

  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.trainingForm.valid) {

      let training: ITrainingPostDto = {

        
        ActivityId: this.activityId,
        Title: this.trainingForm.value.Title,
        // NameofOrganizaton: this.trainingForm.value.NameofOrganizaton,
        // TypeofOrganization: this.trainingForm.value.TypeofOrganization,
        CourseVenue: this.trainingForm.value.CourseVenue,
        StartDate: this.trainingForm.value.StartDate,
        EndDate: this.trainingForm.value.EndDate,
        allocatedCEU:this.trainingForm.value.allocatedCeu
      }

      this.trainingService.createTraining(training).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });

            this.closeModal()

          } else {

            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: res.message });

          }
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: err });


        }
      })
    }
  }


  Update(){
    if (this.trainingForm.valid) {

      let training: ITrainingPostDto = {

        id:this.training.id,
        ActivityId: this.activityId,
        Title: this.trainingForm.value.Title,
        // NameofOrganizaton: this.trainingForm.value.NameofOrganizaton,
        // TypeofOrganization: this.trainingForm.value.TypeofOrganization,
        CourseVenue: this.trainingForm.value.CourseVenue,
        StartDate: this.trainingForm.value.StartDate,
        EndDate: this.trainingForm.value.EndDate,
        allocatedCEU:this.trainingForm.value.allocatedCeu
      }

      this.trainingService.UpdateTrainingList(training).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });

            this.closeModal()

          } else {

            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: res.message });

          }
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: err });


        }
      })

    }
  }
}
