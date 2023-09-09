import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EducationalFieldGetDto } from 'src/app/model/configuration/ICommonDto';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-update-eductional-field',
  templateUrl: './update-eductional-field.component.html',
  styleUrls: ['./update-eductional-field.component.css']
})
export class UpdateEductionalFieldComponent implements OnInit {

  @Input() EducationalField !: EducationalFieldGetDto

  EducationalFieldForm!: FormGroup;

  ngOnInit(): void {

    this.EducationalFieldForm = this.formBuilder.group({
      educationalFieldName: [this.EducationalField.educationalFieldName, Validators.required],
      remark: [this.EducationalField.remark],
    })
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private messageService: MessageService) {

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.EducationalFieldForm.valid) {

      var EducationalFieldUpdate: EducationalFieldGetDto = {

        id: this.EducationalField.id,
        educationalFieldName: this.EducationalFieldForm.value.educationalFieldName,
        remark: this.EducationalFieldForm.value.remark,
      }

      this.configService.updateEducationalField(EducationalFieldUpdate).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })

    }

  }

}


