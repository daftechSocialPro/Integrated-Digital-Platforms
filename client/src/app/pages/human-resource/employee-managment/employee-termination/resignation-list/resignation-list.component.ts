import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { ResignationRequestDto } from 'src/app/model/HRM/IResignationDto';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-resignation-list',
  templateUrl: './resignation-list.component.html',
  styleUrls: ['./resignation-list.component.css']
})
export class ResignationListComponent implements OnInit {

  filters: SelectList[] = [{ name: "Approved", id: '1' }, { "name": "Requests", id: '2' }];
  selected:SelectList={ name: "Approved", id: '1' }
  resignationList!: ResignationRequestDto[]
  constructor(
    private modalService: NgbModal,
    private hrmService: HrmService,
    private commonService: CommonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.getApprovedResignation()
  }

  getResignation() {
    this.hrmService.getResignationList().subscribe({
      next: (res) => {
        this.resignationList = res
        console.log(this.resignationList)
      }
    })
  }
  getApprovedResignation() {
    this.hrmService.getApprovedResignation().subscribe({
      next: (res) => {
        this.resignationList = res
        console.log(this.resignationList)
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

  approveRequest(requestId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to Approve this Resignation Request?',
      header: 'Resignation Approval',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.approveResignation(requestId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getResignation()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  }

  filterChange(value: SelectList) {
    this.selected =value
    if (this.selected.id=='1') {
      this.getApprovedResignation()
    }
    else {
    
      this.getResignation()
    }
    console.log(value)

  }
}