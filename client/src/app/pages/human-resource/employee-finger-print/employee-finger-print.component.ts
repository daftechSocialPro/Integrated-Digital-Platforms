import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFingerPrintListDto } from 'src/app/model/HRM/IEmployeeFingerPrintDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeFingerprintComponent } from './add-employee-fingerprint/add-employee-fingerprint.component';

@Component({
  selector: 'app-employee-finger-print',
  templateUrl: './employee-finger-print.component.html',
  styleUrls: ['./employee-finger-print.component.css']
})
export class EmployeeFingerPrintComponent implements OnInit {

  fingerPrints!: EmployeeFingerPrintListDto[]

  constructor(private hrmService: HrmService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.getFingerPrints();
  }


  getFingerPrints() {
    this.hrmService.getFingerPrintEmployees().subscribe({
      next: (res) => {
        this.fingerPrints = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  addNew() {
    let modalRef = this.modalService.open(AddEmployeeFingerprintComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getFingerPrints();
    });
  }

}