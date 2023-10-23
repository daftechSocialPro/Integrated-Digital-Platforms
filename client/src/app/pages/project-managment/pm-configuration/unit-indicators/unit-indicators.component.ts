import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { IndicatorGetDto } from 'src/app/model/PM/IndicatorsDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UpdateMeasurmentComponent } from './update-measurment/update-measurment.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';

@Component({
  selector: 'app-unit-indicators',
  templateUrl: './unit-indicators.component.html',
  styleUrls: ['./unit-indicators.component.css']
})
export class UnitIndicatorsComponent implements OnInit {

  unitOfMeasurments: IndicatorGetDto[] = [];

  constructor(private configurationService:ConfigurationService,  private commonService: CommonService, private modalService: NgbModal) {
    this.unitOfMeasurmentsList();
  }

  ngOnInit(): void {
    this.unitOfMeasurmentsList();
  }


  unitOfMeasurmentsList() {
    this.configurationService.getUnitOfMeasurment().subscribe({
      next: (res) => {
        this.unitOfMeasurments = res       
      }, error: (err) => {
       
        
      }
    })
  }

  addUnitOfMeasurment() {

   let modalRef =  this.modalService.open(AddMeasurementComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then((res)=>{
      this.unitOfMeasurmentsList()
    })

  }

  updateUnitOfMeasurment(unit: IndicatorGetDto) {

    let modalref = this.modalService.open(UpdateMeasurmentComponent, { size: 'lg', backdrop: 'static' })
    modalref.componentInstance.measurement = unit
    
    modalref.result.then((res)=>{
      this.unitOfMeasurmentsList();
    })
  }

}
