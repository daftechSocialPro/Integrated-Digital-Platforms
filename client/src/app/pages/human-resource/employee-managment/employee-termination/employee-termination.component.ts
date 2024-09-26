import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { ResignationRequestDto, TerminationGetDto } from 'src/app/model/HRM/IResignationDto';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-employee-termination',
  templateUrl: './employee-termination.component.html',
  styleUrls: ['./employee-termination.component.css']
})
export class EmployeeTerminationComponent implements OnInit {

  // filters: SelectList[] = [{ name: "Terminated", id: '1' }, { "name": "Requests", id: '2' }];
  // selected:SelectList={ name: "Terminated", id: '1' }
  terminationList!: TerminationGetDto[]
  constructor(
    private modalService: NgbModal,
    private hrmService: HrmService,
    private commonService: CommonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.gettermination()
  }

  gettermination() {
    this.hrmService.getTerminatedEmployeeList().subscribe({
      next: (res) => {
        this.terminationList = res
       
      }
    })
  }
  getApprovedtermination() {

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
      message: 'Do you want to Approve this termination Request?',
      header: 'termination Approval',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.terminateEmployee(requestId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.gettermination()
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

 
}