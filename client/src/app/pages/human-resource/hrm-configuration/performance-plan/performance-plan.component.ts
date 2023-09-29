import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterCriteria, FilterDetail } from 'src/app/model/FilterCriteria';
import { PerformancePlanDto } from 'src/app/model/HRM/IPerformancePlanDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { AddPerformancePlanComponent } from './add-performance-plan/add-performance-plan.component';
import { Table } from 'primeng/table';
import { AddPerformanceDetailPlanComponent } from './add-performance-detail-plan/add-performance-detail-plan.component';

@Component({
  selector: 'app-performance-plan',
  templateUrl: './performance-plan.component.html',
  styleUrls: ['./performance-plan.component.css']
})
export class PerformancePlanComponent implements OnInit {

  filterCriteria: FilterCriteria[] = [];
  filterDetail: FilterDetail = null!;
  performanceList: PerformancePlanDto[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  filters: any[] = [];

  constructor(
    private hrmService: HrmService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getPlan();
  }

  getPlan() {
    this.hrmService.getPerformancePlans().subscribe({
      next: (res) => {
        this.performanceList = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  addNew() {
    let modalRef = this.modalService.open(AddPerformancePlanComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getPlan()
    });
  }

  // edit(vacancyId: string) {
  //   let modalRef = this.modalService.open(AddVacancyComponent, { size: 'lg', backdrop: 'static' })
  //   modalRef.componentInstance.vacancyId = vacancyId
  //   modalRef.result.then(() => {
  //     this.getVacnacy()
  //   });
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  addPlanDetail(planId: string) {
    let modalRef = this.modalService.open(AddPerformanceDetailPlanComponent, { backdrop: 'static' })
    modalRef.componentInstance.planId = planId
    modalRef.result.then(() => {
      this.getPlan()
    });
  }
}
