import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScsMaintainService } from 'src/app/services/system-control/scs-maintain.service';
import { IBillSectionDto } from 'src/models/system-control/IBillSectionDto';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AddBillOfficerComponent } from './add-bill-officer/add-bill-officer.component';

@Component({
  selector: 'app-bill-officer',
  templateUrl: './bill-officer.component.html',
  styleUrls: ['./bill-officer.component.scss']
})
export class BillOfficerComponent implements OnInit {

  BillOfficers: IBillSectionDto[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 50, 100, 500];

  constructor(
    private maintainService: ScsMaintainService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: ScsMaintainService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getBillOfficers();
  }

  getBillOfficers() {
    this.maintainService.getBillSection().subscribe({
      next: (res) => {
        this.BillOfficers = res;
      }
    });
  }

  getPaginatedBillOfficers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.BillOfficers.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.BillOfficers.length / this.itemsPerPage);
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



  addBillOfficer (){

    let modalRef = this.modalService.open(AddBillOfficerComponent,{size:'',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getBillOfficers()
    })
  }

  removeBillOfficer(empId:string) {

    console.log(empId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Bill Officer?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteBillOfficer(empId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getBillOfficers()
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
