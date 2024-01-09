import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IKebelesDto } from 'src/models/system-control/IKebelesDto';
import { AddKebeleInfoComponent } from './add-kebele-info/add-kebele-info.component';

@Component({
  selector: 'app-kebele-info',
  templateUrl: './kebele-info.component.html',
  styleUrls: ['./kebele-info.component.scss']
})
export class KebeleInfoComponent  implements OnInit {
  first: number = 0;
  rows: number = 5;
  Kebeless: IKebelesDto[];
  paginatedKebeles: IKebelesDto[];

  ngOnInit(): void {

    this.getKebeless()

  }

  constructor(
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: ScsDataService) { }


  getKebeless() {

    this.controlService.getKebeles().subscribe({
      next: (res) => {
        this.Kebeless = res
        this.paginateKebeles()
      }
    })
  }

  addKebeles() {


    let modalRef = this.modalService.open(AddKebeleInfoComponent, { size: 'lg', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getKebeless()
    })

  }

  removeKebeles(KebelesId: number) {

    console.log(KebelesId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete thisKebele info?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteKebeles(KebelesId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getKebeless()
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


  updateKebeles(Kebeles: IKebelesDto) {


    let modalRef = this.modalService.open(AddKebeleInfoComponent, { size: 'lg', backdrop: 'static' })

    modalRef.componentInstance.Kebeles = Kebeles

    modalRef.result.then(() => {
      this.getKebeless()
    })

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateKebeles();
  }


  paginateKebeles() {
    this.paginatedKebeles = this.Kebeless.slice(this.first, this.first + this.rows);
  }



}
