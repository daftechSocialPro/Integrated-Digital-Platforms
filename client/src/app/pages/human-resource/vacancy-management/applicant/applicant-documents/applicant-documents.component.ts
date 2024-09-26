import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AddApplicantDocumentsComponent } from './add-applicant-documents/add-applicant-documents.component';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-applicant-documents',
  templateUrl: './applicant-documents.component.html',
  styleUrls: ['./applicant-documents.component.css']
})
export class ApplicantDocumentsComponent implements OnInit {

  @Input() applicantId!: string;
  @Input() notFinalize!: boolean
  @Input() applicantVacancyId!:string
  
  documents: any

  constructor(
    private modalService: NgbModal,
    private vacancyService: VacancyService,
    private commonService: CommonService) { }
  ngOnInit(): void {


    this.getApplicantDocuments()
  }

  getFIle(url: string) {

    return this.commonService.createImgPath(url)
  }

  addApplicantDocuments() {

    let modalRef = this.modalService.open(AddApplicantDocumentsComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.employeeId = this.applicantId
    modalRef.componentInstance.applicantVacancyId = this.applicantVacancyId
    modalRef.result.then(() => {

      this.getApplicantDocuments()

    })


  }

  getApplicantDocuments() {


    this.vacancyService.getApplicantDocuments(this.applicantVacancyId).subscribe({
      next: (res) => {
        this.documents = res
      }
    })

  }



}
