import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityMaps, ActivityView } from 'src/app/model/PM/ActivityViewDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { PMService } from 'src/app/services/pm.services';
import { ActivityMapComponent } from './activity-map/activity-map.component';

@Component({
  selector: 'app-activity-location',
  templateUrl: './activity-location.component.html',
  styleUrls: ['./activity-location.component.css']
})
export class ActivityLocationComponent implements OnInit {

  serachForm!: FormGroup
  activities! : ActivityView[]
  activitymap! : ActivityMaps[]

  locations !: SelectList[] 

  constructor(
    private dropDownService:DropDownService,
    private modalService : NgbModal,
    private formBuilder:FormBuilder,
    private pmService : PMService){}

  ngOnInit(): void {

   
    this.serachForm = this.formBuilder.group({
      BudgetYear: [''],
      locationId: [''],     
    })

    this.getLocations()
    
  }

  getLocations(){
    this.dropDownService.getProjectLocations().subscribe({
      next:(res)=>{
        this.locations = res 
      }
    })
  }

  Search(){

    this.pmService.getActivityLocationReport(this.serachForm.value.BudgetYear,this.serachForm.value.locationId).subscribe({
      next:(res)=>{
        this.activities = res 

        this.activitymap=res.map(item=>({
          activityName:item.name,
          activityNumber:item.activityNumber,
          lat:item.projectLocationLat,
          lng:item.projectLocationLng,
          projectLocation:item.projectLocation
        })     
        )
        
      }
    })

  }

  viewOnMap (){
    let modalRef = this.modalService.open(ActivityMapComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.activtYMaps= this.activitymap
  }
}
