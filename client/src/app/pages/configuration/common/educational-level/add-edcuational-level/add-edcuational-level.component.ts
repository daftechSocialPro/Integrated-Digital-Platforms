import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EducationalLevelPostDto } from 'src/app/model/configuration/ICommonDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edcuational-level',
  templateUrl: './add-edcuational-level.component.html',
  styleUrls: ['./add-edcuational-level.component.css']
})
export class AddEdcuationalLevelComponent implements OnInit {


  EducationalLevelForm!: FormGroup;
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

    this.EducationalLevelForm = this.formBuilder.group({
      educationalLevelName: ['', Validators.required],
      remark: [''],


    })

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.EducationalLevelForm.valid) {

      var EducationalLevelPost: EducationalLevelPostDto = {
        educationalLevelName: this.EducationalLevelForm.value.educationalLevelName,
        remark: this.EducationalLevelForm.value.remark,
        createdById: this.user.userId

      }

      this.configService.addEducationalLevel(EducationalLevelPost).subscribe({
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
