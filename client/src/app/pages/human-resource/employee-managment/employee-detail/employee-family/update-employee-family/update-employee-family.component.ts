import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeFamilyGetDto, EmployeeFamilyPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employee-family',
  templateUrl: './update-employee-family.component.html',
  styleUrls: ['./update-employee-family.component.css']
})
export class UpdateEmployeeFamilyComponent implements OnInit {

 
  @Input() employeeFamily! :EmployeeFamilyGetDto
 
  FamilyForm !: FormGroup;
  departments!: SelectList[];
  positions!: SelectList[];
  user ! : UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
   
    this.FamilyForm.controls['fullName'].setValue(this.employeeFamily.fullName)
    this.FamilyForm.controls['gender'].setValue(this.employeeFamily.gender) 
    this.FamilyForm.controls['familyRelation'].setValue(this.employeeFamily.familyRelation)    
    this.FamilyForm.controls['birthDate'].setValue(this.employeeFamily.birthDate)
    this.FamilyForm.controls['remark'].setValue(this.employeeFamily.remark)

  }
  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService : MessageService
    ) {

      this.FamilyForm = this.formBuilder.group({        
       
        fullName: [null, Validators.required],
        gender: [null, Validators.required],
        familyRelation: [null, Validators.required],
        birthDate: [null, Validators.required],
        remark: [null]
      })
     }


  closeModal() {
    this.activeModal.close()
  }

  submit(){
    if (this.FamilyForm.valid){

      var employeeFamily : EmployeeFamilyGetDto={

        id:this.employeeFamily.id,
        fullName : this.FamilyForm.value.fullName,
        gender : this.FamilyForm.value.gender,
        familyRelation : this.FamilyForm.value.familyRelation,
        birthDate : this.FamilyForm.value.birthDate,
        remark : this.FamilyForm.value.remark,      
      
      }
      this.hrmService.updateEmployeeFamily(employeeFamily).subscribe(
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
