import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, FilterMetadata, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterCriteria, FilterDetail, VacancyFilter } from 'src/app/model/FilterCriteria';
import { VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';
import { VacancyService } from 'src/app/services/vacancy.service';
import { AddVacancyComponent } from './add-vacancy/add-vacancy.component';
import { AddVaccancyDocumentComponent } from '../add-vaccancy-document/add-vaccancy-document.component';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})

export class VacancyListComponent implements OnInit {

  vacancyFilter: VacancyFilter = {

  };
  filterDetail: FilterDetail = null!;
  vacancyList: VacancyListDto[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  filters: any[] = [];
  departments!: SelectList[];
  positions!: SelectList[];

  constructor(
    private vacancyService: VacancyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private route : Router,
    private commonService: CommonService,
    private dropService: DropDownService) { }

  ngOnInit() {
   
    this.getDepartments();
    this.getPositions();
  }

  clear(table: Table) {
    table.clear();
}

  getVacnacy() {
   if(this.vacancyFilter && this.vacancyFilter.status){
    this.vacancyFilter.status = this.vacancyFilter.status.toString().toLowerCase() === 'true';
   }
    this.vacancyService.getVacancyList(this.vacancyFilter).subscribe({
      next: (res) => {
        this.vacancyList = res;
        this.vacancyFilter =   {

        };
      }, error: (err) => {
       
      }
    })
  }

  getDepartments() {
    this.dropService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res

      }
    })
  }



  getPositions() {
    this.dropService.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
      }
    })
  }

  addNew() {
    let modalRef = this.modalService.open(AddVacancyComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getVacnacy()
    });
  }

  edit(vacancyId: string) {
    let modalRef = this.modalService.open(AddVacancyComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.vacancyId = vacancyId
    modalRef.result.then(() => {
      this.getVacnacy()
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  approveVaccancy(vaccancyId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to approve this Vaccancy?',
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vacancyService.approveVaccancy(vaccancyId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getVacnacy()
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

  addDocuments(vaccancyId: string) {
    let modalRef = this.modalService.open(AddVaccancyDocumentComponent, { backdrop: 'static' })
    modalRef.componentInstance.vaccancyId = vaccancyId

    modalRef.result.then(() => {
      this.getVacnacy()
    })
  }

  getImage(url: string) {

    return this.commonService.createImgPath(url)

  }
  deleteDocument(vaccancyDocumentId: string, vacancyName: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete ' + vacancyName + " Document ?",
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vacancyService.deleteVacancyDocumentId(vaccancyDocumentId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getVacnacy()
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

  goToDetails(vacancyId: string){
    this.route.navigate(['/HRM/vacancyDetail',vacancyId])
  }

}
