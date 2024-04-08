import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScsMaintainService } from 'src/app/services/system-control/scs-maintain.service';
import { IBillEmpDutiesDto } from 'src/models/system-control/IBillEmpDutiesDto';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AddBillDutiesComponent } from './add-bill-duties/add-bill-duties.component';

@Component({
  selector: 'app-bill-duties',
  templateUrl: './bill-duties.component.html',
  styleUrls: ['./bill-duties.component.scss']
})
export class BillDutiesComponent {

  BillDuties: IBillEmpDutiesDto[]
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private maintainService: ScsMaintainService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private controlService : ScsMaintainService,
              private modalService:NgbModal) { }


  ngOnInit(): void {

this.getBillDuties()
  }


  getBillDuties() {

    this.maintainService.getBillEmpDuties().subscribe({
      next: (res) => {
        this.BillDuties = res
      }
    })

  }

  getPaginatedBillDuties(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.BillDuties.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.BillDuties.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  // Function to go to a specific page
goToPage(page: number): void {
  if (page >= 1 && page <= this.getTotalPages()) {
    this.currentPage = page;
  }
}



addBillEmpDuties (){

  let modalRef = this.modalService.open(AddBillDutiesComponent,{size:'',backdrop:'static'})
  modalRef.result.then(()=>{
    this.getBillDuties()
  })
}

removeBillEmpDuties(recordno:number) {


  this.confirmationService.confirm({
    message: 'Are You sure you want to delete this Bill Officer?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.controlService.deleteBillEmpDuties(recordno).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
            this.getBillDuties()
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

updateBillEmpDuties(recordno:number){


  let modalRef = this.modalService.open(AddBillDutiesComponent,  {size:'lg',backdrop:'static'})

  modalRef.componentInstance.recordNo=recordno

  modalRef.result.then(()=>{
    this.getBillDuties()
  })  }

  


}
