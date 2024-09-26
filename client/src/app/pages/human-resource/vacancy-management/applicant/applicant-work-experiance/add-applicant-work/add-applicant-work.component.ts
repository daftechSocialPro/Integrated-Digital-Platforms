import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeHistoryPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { ApplicantWorkDto } from 'src/app/model/Vacancy/IApplicantDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-add-applicant-work',
  templateUrl: './add-applicant-work.component.html',
  styleUrls: ['./add-applicant-work.component.css']
})
export class AddApplicantWorkComponent implements OnInit {

  @Input() employeeId! : string
  
  HistoryForm !: FormGroup;

  user ! : UserView
  fileGH! : File;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

  }
  constructor(
    private activeModal: NgbActiveModal, 
    private vacancyService: VacancyService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService: MessageService,
   
    ) {

      this.HistoryForm = this.formBuilder.group({        
       
        organizationName: [null, Validators.required],
        position: [null, Validators.required],
        description: [null],
        startDate: [null, Validators.required],
        endDate: [null],
        responsibility:[null]
      })
     }

 
  closeModal() {
    this.activeModal.close()
  }
  onUpload(event: any) {
    var file: File = event.target.files[0];
    this.fileGH = file   
  }

  submit(){
    if (this.HistoryForm.valid){

      var employeeHistory : ApplicantWorkDto={
      
        organizationName : this.HistoryForm.value.organizationName,
        position : this.HistoryForm.value.position,
        description : this.HistoryForm.value.description,
        fromDate : this.HistoryForm.value.startDate,
        toDate : this.HistoryForm.value.endDate,
        responsibility : this.HistoryForm.value.responsibility,
        createdById : this.user.userId,
        applicantId : this.employeeId
      }

      var formData = new FormData();
      for (let key in employeeHistory) {
        if (employeeHistory.hasOwnProperty(key)) {
          formData.append(key, (employeeHistory as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('file', this.fileGH);  


      this.vacancyService.addApplicantExperiance(formData).subscribe(
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