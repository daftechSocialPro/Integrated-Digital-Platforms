import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ITrainerGetDto, ITrainerPostDto } from 'src/app/model/Training/TrainerDto';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  @Input() trainerId!: string
  @Input () trainer :ITrainerGetDto
  trainerForm!: FormGroup
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private trainerService: TrainingService,
    private messageService: MessageService

  ) {


  }

  ngOnInit(): void {

    if(this.trainer){
      this.trainerForm = this.formBuilder.group({
        FullName: [this.trainer.fullName, Validators.required],
        phoneNumber: [this.trainer.phoneNumber, Validators.required],
        email: [this.trainer.email, Validators.required] 
  
      })
    }
    else {
      this.trainerForm = this.formBuilder.group({
        FullName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', Validators.required] 
  
      })
    }
  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.trainerForm.valid) {

      let trainer: ITrainerPostDto = {

        FullName: this.trainerForm.value.FullName,
        PhoneNumber : this.trainerForm.value.phoneNumber,
        Email : this.trainerForm.value.email,
        TrainingId: this.trainerId,
     
      }

      this.trainerService.createTrainer(trainer).subscribe({
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
  update() {

    if (this.trainerForm.valid) {

      let trainer: ITrainerPostDto = {

        Id:this.trainer.id,
        FullName: this.trainerForm.value.FullName,
        PhoneNumber : this.trainerForm.value.phoneNumber,
        Email : this.trainerForm.value.email,
        TrainingId: this.trainerId,
     
      }

      this.trainerService.UpdateTrainerList(trainer).subscribe({
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
