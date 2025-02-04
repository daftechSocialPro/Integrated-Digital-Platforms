import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivityView, ViewProgressDto } from '../activityview';
import { AcceptRejectComponent } from './accept-reject/accept-reject.component';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.css']
})
export class ViewProgressComponent implements OnInit {

  @Input() activity !: ActivityView;
  progress!:ViewProgressDto[];
  userType :string[]=["Director","Project Manager","Finance"]
  actionType : string []=["Accept","Reject"]
  constructor(private activeModal: NgbActiveModal,private modalService : NgbModal,private pmService : PMService,private commonService : CommonService) { }
  ngOnInit(): void { 
    

    
    this.getProgress() }


  getProgress (){

    this.pmService.viewProgress(this.activity.id).subscribe({
      next:(res)=>{
        this.progress = res
        
      },
      error:(err)=>{
  
      }
    })

  }

  closeModal() {
    this.activeModal.close()
  }

  getFilePath (value:string){

    return this.commonService.createImgPath(value)

  }

  ApporveReject(progressId:string,user:string,actiontype:string){
    let modalRef = this.modalService.open(AcceptRejectComponent,{size:'md',backdrop:'static'})
    modalRef.componentInstance.progressId = progressId
    modalRef.componentInstance.userType = user
    modalRef.componentInstance.actiontype = actiontype
    
    modalRef.result.then(()=>
    {
      this.closeModal()
    }
    )

  }



}
