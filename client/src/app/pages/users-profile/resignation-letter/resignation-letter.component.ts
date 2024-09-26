import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResignationRequestComponent } from './resignation-request/resignation-request.component';
import { ResignationRequestDto } from 'src/app/model/HRM/IResignationDto';
import { HrmService } from 'src/app/services/hrm.service';
import { CommonService } from 'src/app/services/common.service';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';

@Component({
  selector: 'app-resignation-letter',
  templateUrl: './resignation-letter.component.html',
  styleUrls: ['./resignation-letter.component.css']
})
export class ResignationLetterComponent implements OnInit {


  resignationList!: ResignationRequestDto[]
  constructor(
    private modalService: NgbModal,
    private hrmService: HrmService,
    private commonService: CommonService) {

  }
  ngOnInit(): void {
    this.getResignation()
  }
  requestResignation() {

let modalRef=    this.modalService.open(ResignationRequestComponent, { size: 'lg', backdrop: 'static' })

modalRef.result.then(()=>{
  this.getResignation()
})
  }

  getResignation() {
    this.hrmService.getResignationList().subscribe({
      next: (res) => {
        this.resignationList = res
      
      }
    })
  }

  getPdfFile(item: string) {
    return this.commonService.getPdf(item)
  }
  viewPdf(link: string) {

    let pdfLink = this.getPdfFile(link)
    let modalRef = this.modalService.open(ViewPdfComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.pdflink = pdfLink
  }

}
