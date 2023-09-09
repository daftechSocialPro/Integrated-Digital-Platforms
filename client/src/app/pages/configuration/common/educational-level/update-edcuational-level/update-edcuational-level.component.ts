import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EducationalLevelGetDto, EducationalLevelPostDto } from 'src/app/model/configuration/ICommonDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-edcuational-level',
  templateUrl: './update-edcuational-level.component.html',
  styleUrls: ['./update-edcuational-level.component.css']
})
export class UpdateEdcuationalLevelComponent implements OnInit {

  @Input() EducationalLevel !: EducationalLevelGetDto

  EducationalLevelForm!: FormGroup;

  ngOnInit(): void {

    this.EducationalLevelForm = this.formBuilder.group({
      educationalLevelName: [this.EducationalLevel.educationalLevelName, Validators.required],
      remark: [this.EducationalLevel.remark],
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

    if (this.EducationalLevelForm.valid) {

      var EducationalLevelUpdate: EducationalLevelGetDto = {

        id: this.EducationalLevel.id,
        educationalLevelName: this.EducationalLevelForm.value.educationalLevelName,
        remark: this.EducationalLevelForm.value.remark,
      }

      this.configService.updateEducationalLevel(EducationalLevelUpdate).subscribe({
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

