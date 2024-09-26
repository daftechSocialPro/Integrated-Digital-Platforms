import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IReportingPeriodGetDto } from 'src/app/model/PM/ITimePeriodDto';
import { PMService } from 'src/app/services/pm.services';
import { AddReportPeriodComponent } from './add-report-period/add-report-period.component';

@Component({
  selector: 'app-reporting-period',
  templateUrl: './reporting-period.component.html',
  styleUrls: ['./reporting-period.component.css']
})
export class ReportingPeriodComponent implements OnInit {
  
  ReportingPeriods! : IReportingPeriodGetDto[]

  ngOnInit(): void {

    this.getReportingPeriods()
    
  }

  constructor (private pmService : PMService,private modalService:NgbModal){}


  getReportingPeriods (){
    this.pmService.getReportingPeriod().subscribe({
      next:(res)=>{      
          this.ReportingPeriods = res       
      
      },error:(err)=>{
    
      }
    })
  }
  addReportingPeriod(){

    let modalRef = this.modalService.open(AddReportPeriodComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getReportingPeriods()
    })
  }

  updateReportingPeriod (ReportingPeriod :IReportingPeriodGetDto){
    let modalRef = this.modalService.open(AddReportPeriodComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.ReportingPeriod = ReportingPeriod
    modalRef.result.then(()=>{
      this.getReportingPeriods()
    });
  }
}
