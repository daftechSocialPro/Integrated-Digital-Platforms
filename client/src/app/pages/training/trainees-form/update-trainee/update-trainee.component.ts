import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ITraineeGetDto, ITraineePostDto } from 'src/app/model/Training/TraineeDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-update-trainee',
  templateUrl: './update-trainee.component.html',
  styleUrls: ['./update-trainee.component.css']
})
export class UpdateTraineeComponent implements OnInit {

  @Input() row: ITraineeGetDto
  educationalLevels: SelectList[] = []
  regions: SelectList[] = []


  genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" }
  ]



  traineeForm!: FormGroup;

  ngOnInit(): void {


    this.getEducationalLevels()

    this.getRegions()

    {
      this.traineeForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        gender: ['', Validators.required],
        profession: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        age: ['', Validators.required],
        region: ['', Validators.required],
        zone: ['', Validators.required],
        woreda: ['', Validators.required],

        educationalLevel: ['', Validators.required],
        educationalField: ['', Validators.required],
        nameofOrganizaton: ['', Validators.required],
        typeofOrganization: ['', Validators.required],
        preSummary: ['', Validators.required],
        postSummary: [''],

      });
      this.traineeForm.patchValue({
        fullName: this.row.fullName,
        gender: this.row.gender,
        profession: this.row.profession,
        phoneNumber: this.row.phoneNumber,
        email: this.row.email,
        age: this.row.age,
        region: this.row.regionId,
        zone: this.row.zone,
        woreda: this.row.woreda,
        educationalLevel: this.row.educationalLevelId,
        educationalField: this.row.educationalField,
        nameofOrganizaton: this.row.nameofOrganizaton,
        typeofOrganization: this.row.typeofOrganization,
        preSummary: this.row.preSummary,
        postSummary: this.row.postSummary
      });
    }

  }
  constructor(
    private dropdownService: DropDownService,
    private trainingService: TrainingService,
    private messageService:MessageService,
    private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {

  }
  addRow(): void {


    if (this.traineeForm.valid) {
      const newRow = this.traineeForm.value;

      this.addTrainee(newRow)
     
    }
  }

  getRegions() {
    this.dropdownService.getRegionsDropdown('18EEF146-FC48-4074-94E7-E5DD4A3BE242').subscribe({
      next: (res) => {

        this.regions = res
      }
    })
  }
  getEducationalLevels() {
    this.dropdownService.getEducationLevelDropdown().subscribe({
      next: (res) => {
        this.educationalLevels = res
      }
    })
  }

  addTrainee(traineePost: ITraineePostDto) {
    traineePost.regionId = this.traineeForm.value.region
    traineePost.EducationalLevelId = this.traineeForm.value.educationalLevel
    traineePost.Id=this.row.id

    this.trainingService.updateTrainee(traineePost).subscribe({
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





  closeModal() {
    this.activeModal.close()
  }

}
