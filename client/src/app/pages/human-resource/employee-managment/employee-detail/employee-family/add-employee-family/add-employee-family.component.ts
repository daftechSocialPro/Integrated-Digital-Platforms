import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeFamilyPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-family',
  templateUrl: './add-employee-family.component.html',
  styleUrls: ['./add-employee-family.component.css']
})
export class AddEmployeeFamilyComponent implements OnInit {

  @Input() employeeId! : string

  FamilyForm !: FormGroup;
 
  user ! : UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

  }
  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService: MessageService
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

      var employeeFamily : EmployeeFamilyPostDto={

        
        fullName : this.FamilyForm.value.fullName,
        gender : this.FamilyForm.value.gender,
        familyRelation : this.FamilyForm.value.familyRelation,
        birthDate : this.FamilyForm.value.birthDate,
        remark : this.FamilyForm.value.remark,
        createdById : this.user.userId,
        employeeId : this.employeeId
      }
      this.hrmService.addEmployeeFamily(employeeFamily).subscribe(
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