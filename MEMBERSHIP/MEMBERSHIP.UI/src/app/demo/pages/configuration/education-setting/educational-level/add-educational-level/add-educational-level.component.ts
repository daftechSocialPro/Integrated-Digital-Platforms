import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { IEducationalLevelGetDto, IEducationalLevelPostDto } from 'src/models/configuration/IEducationDto';

@Component({
  selector: 'app-add-educational-level',
  templateUrl: './add-educational-level.component.html',
  styleUrls: ['./add-educational-level.component.scss']
})
export class AddEducationalLevelComponent implements OnInit {

  @Input() EducationalLevel:IEducationalLevelGetDto
  
    EducationalLevelForm!: FormGroup;
    user !: UserView
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
  
      if(this.EducationalLevel){
        this.EducationalLevelForm.controls['educationalLevelName'].setValue(this.EducationalLevel.educationalLevelName)
        this.EducationalLevelForm.controls['remark'].setValue(this.EducationalLevel.remark)
       
      }
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
  
        var EducationalLevelPost: IEducationalLevelPostDto = {
  
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
  
    update(){
  
      if (this.EducationalLevelForm.valid) {
  
        var EducationalLevelPost: IEducationalLevelPostDto = {
          id:this.EducationalLevel.id,
          educationalLevelName: this.EducationalLevelForm.value.educationalLevelName,
          remark: this.EducationalLevelForm.value.remark, 
          
  
        }
  
        this.configService.updateEducationalLevel(EducationalLevelPost).subscribe({
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
  