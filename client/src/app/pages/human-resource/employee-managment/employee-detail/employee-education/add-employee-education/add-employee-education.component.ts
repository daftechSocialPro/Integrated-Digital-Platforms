import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeEducationPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-education',
  templateUrl: './add-employee-education.component.html',
  styleUrls: ['./add-employee-education.component.css']
})
export class AddEmployeeEducationComponent implements OnInit {

  @Input() employeeId! : string

  EducationForm !: FormGroup;
  educationLevel !: SelectList[];
  educationField !: SelectList[];
  user ! : UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.geteducationDropDown();
  }
  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService
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

  geteducationDropDown(){
    this.dropDownService.getEducationLevelDropdown().subscribe({
      next : (res) => {
        this.educationLevel = res;
      }
    });
    this.dropDownService.getEducationFieldDropdown().subscribe({
      next : (res) => {
        this.educationField = res;
      }
    })
  }

  submit(){
    if (this.EducationForm.valid){

      var employeeEducation : EmployeeEducationPostDto={
        
        educationalLevelId : this.EducationForm.value.educationalLevelId,
        educationalFieldId : this.EducationForm.value.educationalFieldId,
        institution : this.EducationForm.value.institution,
        fromDate : this.EducationForm.value.fromDate,
        toDate : this.EducationForm.value.toDate,
        remark: this.EducationForm.value.remark,
        createdById : this.user.userId,
        employeeId : this.employeeId
      }
      this.hrmService.addEmployeeEducation(employeeEducation).subscribe(
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
