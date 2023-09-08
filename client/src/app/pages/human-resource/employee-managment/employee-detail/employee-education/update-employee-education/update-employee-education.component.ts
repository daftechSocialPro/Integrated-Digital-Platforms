import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeEducationGetDto, EmployeeEducationPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employee-education',
  templateUrl: './update-employee-education.component.html',
  styleUrls: ['./update-employee-education.component.css']
})
export class UpdateEmployeeEducationComponent  implements OnInit {

 
  @Input() employeeEducation! :EmployeeEducationGetDto
 
  EducationForm !: FormGroup;
  departments!: SelectList[];
  positions!: SelectList[];
  user ! : UserView
  ngOnInit(): void {

    console.log(this.employeeEducation)
    this.user = this.userService.getCurrentUser()
   
    this.EducationForm.controls['educationalLevelId'].setValue(this.employeeEducation.educationalLevelId)
    this.EducationForm.controls['educationalFieldId'].setValue(this.employeeEducation.educationalFieldId) 
    this.EducationForm.controls['institution'].setValue(this.employeeEducation.institution)    
    this.EducationForm.controls['fromDate'].setValue(this.employeeEducation.fromDate)
    this.EducationForm.controls['toDate'].setValue(this.employeeEducation.toDate)
    this.EducationForm.controls['remark'].setValue(this.employeeEducation.remark)
  }
  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService : MessageService
    ) {

      this.EducationForm = this.formBuilder.group({        
       
        educationalLevelId: [null, Validators.required],
        educationalFieldId: [null, Validators.required],
        institution: [null, Validators.required],
        fromDate: [null, Validators.required],
        toDate: [null],
        remark: [null]
      })
     }


  closeModal() {
    this.activeModal.close()
  }

  submit(){
    if (this.EducationForm.valid){

      var employeeEducation : EmployeeEducationPostDto={

        id:this.employeeEducation.id,
        educationalLevelId : this.EducationForm.value.educationalLevelId,
        educationalFieldId : this.EducationForm.value.educationalFieldId,
        institution : this.EducationForm.value.institution,
        fromDate : this.EducationForm.value.fromDate,
        toDate : this.EducationForm.value.toDate,
        remark: this.EducationForm.value.remark,
        createdById : this.user.userId,
     
      
      }
      this.hrmService.updateEmployeeEducation(employeeEducation).subscribe(
        {
          next:(res)=>{
            if (res.success){
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
            
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
            
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
          }
        }
      )

    }

  }

}

