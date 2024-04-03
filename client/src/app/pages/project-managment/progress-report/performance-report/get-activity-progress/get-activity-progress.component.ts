import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ShowonmapComponent } from '../showonmap/showonmap.component';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-get-activity-progress',
  templateUrl: './get-activity-progress.component.html',
  styleUrls: ['./get-activity-progress.component.css']
})
export class GetActivityProgressComponent implements OnInit {

  @Input() activityId !: string

  actProgress !: any
  ngOnInit(): void {

    this.pmService.GetActivityProgress(this.activityId).subscribe({
      next:(res)=>{
        this.actProgress = res 

      },error:(err)=>{
        console.error(err)
      }
    })
    
  }

  constructor(private pmService:PMService, private activeModal : NgbActiveModal,private commonService:CommonService, private modalService:NgbModal){

  
  
  }
  getFile(value:string){

    return this.commonService.createImgPath(value)
  }

  closeModal(){

    this.activeModal.close()
  }

  initialize(lat:number,lng:number){

  let modalRef =this.modalService.open(ShowonmapComponent,{size:'xl',backdrop:'static'})
  modalRef.componentInstance.lat=lat
  modalRef.componentInstance.lng = lng
  modalRef.componentInstance.title= "Location where the User add Progress"
  }
}
