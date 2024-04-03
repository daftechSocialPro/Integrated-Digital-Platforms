import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import { ApprovalProgressDto } from '../../activityview'
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-accept-reject',
  templateUrl: './accept-reject.component.html',
  styleUrls: ['./accept-reject.component.css']
})
export class AcceptRejectComponent implements OnInit {
  @Input() progressId!: string
  @Input() userType!: string
  @Input() actiontype!: string
  acceptForm !: FormGroup
  user!:UserView


  ngOnInit(): void {
this.user=this.userService.getCurrentUser()
  }
  constructor(
    private formBuilder: FormBuilder, 
    private activeModal: NgbActiveModal,
    private pmService:PMService ,
    private userService:UserService,
    private messageService : MessageService,
    private commonService :CommonService) {

    this.acceptForm = this.formBuilder.group({

      Remark: ['']

    })
  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.acceptForm.valid) {
   

      let approvalProgressDto: ApprovalProgressDto = {
        progressId: this.progressId,
        actiontype: this.actiontype,
        userType: this.userType,
        Remark: this.acceptForm.value.Remark,
        createdBy:this.user.userId
      }

this.pmService.approveProgress(approvalProgressDto).subscribe({

  next:(res)=>{
    
    this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: 'Progress Approval Successfully Created' });        

   
    this.closeModal()
  },error:(err)=>{
    this.messageService.add({ severity: 'error', summary: 'Network Error.', detail: err.message});        

  }


})      

    }
  }


}
