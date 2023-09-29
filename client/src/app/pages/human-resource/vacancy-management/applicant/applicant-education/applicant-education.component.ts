import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeEducationComponent } from '../../../employee-managment/employee-detail/employee-education/add-employee-education/add-employee-education.component';
import { AddApplicantEducationComponent } from './add-applicant-education/add-applicant-education.component';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css']
})
export class ApplicantEducationComponent  implements OnInit {


  @Input() applicantId!: string;
  @Input() notFinalize! :boolean
  educations : any 
  position: string = 'center';

  ngOnInit(): void {
    this.getEmployeeEducation()
  }

  constructor(
    private vacancyService : VacancyService,
    private modalService : NgbModal,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService){}

  getEmployeeEducation(){
    this.vacancyService.getApplicantEducation(this.applicantId).subscribe({
      next:(res)=>{
        this.educations = res 
      }
    })
  }

  addEmploymentEducation (){
    let modalRef = this.modalService.open(AddApplicantEducationComponent,{size:'lg',backdrop:'static'})
   modalRef.componentInstance.employeeId = this.applicantId
    modalRef.result.then(()=>{
      this.getEmployeeEducation()
    })
  }
}

