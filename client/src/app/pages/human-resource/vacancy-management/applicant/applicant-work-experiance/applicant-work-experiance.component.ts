import { Component, Input, OnInit } from '@angular/core';
import { ApplicantWorkDto } from 'src/app/model/Vacancy/IApplicantDto';
import { AddApplicantWorkComponent } from './add-applicant-work/add-applicant-work.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VacancyService } from 'src/app/services/vacancy.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-applicant-work-experiance',
  templateUrl: './applicant-work-experiance.component.html',
  styleUrls: ['./applicant-work-experiance.component.css']
})
export class ApplicantWorkExperianceComponent implements OnInit {

  @Input() applicantId !: string
  @Input() notFinalize! :boolean
  experiances!: ApplicantWorkDto[]
  ngOnInit(): void {

    this.getApplicantExperiance()

  }

  constructor(
    private vacancyService: VacancyService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private commonService: CommonService) { }

  getApplicantExperiance() {
    this.vacancyService.getApplicantExperiance(this.applicantId).subscribe({
      next: (res) => {
        this.experiances = res
      }
    })
  }

  addApplicantExperiances() {
    let modalRef = this.modalService.open(AddApplicantWorkComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.employeeId = this.applicantId
    modalRef.result.then(() => {
      this.getApplicantExperiance()
    })
  }


  getFIle(url:string){

    return this.commonService.createImgPath(url)
  }

}
