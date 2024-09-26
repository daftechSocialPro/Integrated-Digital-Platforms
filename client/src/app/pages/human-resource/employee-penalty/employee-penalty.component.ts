import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PenaltyListDto } from 'src/app/model/HRM/IPenaltyListDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeePenaltyComponent } from './add-employee-penalty/add-employee-penalty.component';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-penalty',
  templateUrl: './employee-penalty.component.html',
  styleUrls: ['./employee-penalty.component.css']
})
export class EmployeePenaltyComponent implements OnInit {

  employeePenalty!: PenaltyListDto[]

  constructor(private hrmService: HrmService, private modalService: NgbModal, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getPenalty();
  }


  getPenalty() {
    this.hrmService.getPenaltyLists().subscribe({
      next: (res) => {
        this.employeePenalty = res;
      }, error: (err) => {
        
      }
    });
  }

  addNew() {
    let modalRef = this.modalService.open(AddEmployeePenaltyComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getPenalty();
    });
  }

  changeStatus(id: string){
    this.hrmService.changeStatusofPenalty(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Changed Status', life: 3000 });
          this.getPenalty();
        }
        else {
          this.messageService.add({ severity: 'Error', summary: 'Error', detail: res.message, life: 3000 });
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: 'Please Check Your Fields', life: 3000 });
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}