import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EducationalFieldPostDto } from 'src/app/model/configuration/ICommonDto';

import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edcuational-field',
  templateUrl: './add-edcuational-field.component.html',
  styleUrls: ['./add-edcuational-field.component.css']
})
export class AddEdcuationalFieldComponent implements OnInit {


  EducationalFieldForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private userService: UserService,
    private messageService: MessageService) {

    this.EducationalFieldForm = this.formBuilder.group({
      educationalFieldName: ['', Validators.required],
      remark: [''],


    })

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.EducationalFieldForm.valid) {

      var EducationalFieldPost: EducationalFieldPostDto = {
        educationalFieldName: this.EducationalFieldForm.value.educationalFieldName,
        remark: this.EducationalFieldForm.value.remark,
        createdById: this.user.userId

      }

      this.configService.addEducationalField(EducationalFieldPost).subscribe({
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


