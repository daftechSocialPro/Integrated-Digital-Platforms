import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { IEducationalFieldGetDto, IEducationalFieldPostDto } from 'src/models/configuration/IEducationDto';

@Component({
  selector: 'app-add-educational-field',
  templateUrl: './add-educational-field.component.html',
  styleUrls: ['./add-educational-field.component.scss']
})
export class AddEducationalFieldComponent implements OnInit {

  @Input() EducationalField:IEducationalFieldGetDto
  
    EducationalFieldForm!: FormGroup;
    user !: UserView
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
  
      if(this.EducationalField){
        this.EducationalFieldForm.controls['educationalFieldName'].setValue(this.EducationalField.educationalFieldName)
        this.EducationalFieldForm.controls['remark'].setValue(this.EducationalField.remark)
       
      }
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
  
        var EducationalFieldPost: IEducationalFieldPostDto = {
  
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
  
    update(){
  
      if (this.EducationalFieldForm.valid) {
  
        var EducationalFieldPost: IEducationalFieldPostDto = {
          id:this.EducationalField.id,
          educationalFieldName: this.EducationalFieldForm.value.educationalFieldName,
          remark: this.EducationalFieldForm.value.remark, 
          
  
        }
  
        this.configService.updateEducationalField(EducationalFieldPost).subscribe({
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
  
