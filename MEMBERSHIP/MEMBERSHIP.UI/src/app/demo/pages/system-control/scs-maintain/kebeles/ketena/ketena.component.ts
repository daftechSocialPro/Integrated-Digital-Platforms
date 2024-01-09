import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IKetenaDto } from 'src/models/system-control/IKetenaDto';
import { AddKetenaComponent } from './add-ketena/add-ketena.component';

@Component({
  selector: 'app-ketena',
  templateUrl: './ketena.component.html',
  styleUrls: ['./ketena.component.scss']
})
export class KetenaComponent implements OnInit {
  first: number = 0;
  rows: number = 5;
  Ketenas: IKetenaDto[];
  paginatedKetena: IKetenaDto[];

  ngOnInit(): void {

    this.getKetenas()

  }

  constructor(
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: ScsDataService) { }


  getKetenas() {

    this.controlService.getKetena().subscribe({
      next: (res) => {
        this.Ketenas = res
        this.paginateKetena()
      }
    })
  }

  addKetena() {


    let modalRef = this.modalService.open(AddKetenaComponent, { size: 'lg', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getKetenas()
    })

  }

  removeKetena(KetenaId: number) {

    console.log(KetenaId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Meter Size?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteKetena(KetenaId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getKetenas()
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


  updateKetena(Ketena: IKetenaDto) {


    let modalRef = this.modalService.open(AddKetenaComponent, { size: 'lg', backdrop: 'static' })

    modalRef.componentInstance.Ketena = Ketena

    modalRef.result.then(() => {
      this.getKetenas()
    })

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateKetena();
  }


  paginateKetena() {
    this.paginatedKetena = this.Ketenas.slice(this.first, this.first + this.rows);
  }



}
