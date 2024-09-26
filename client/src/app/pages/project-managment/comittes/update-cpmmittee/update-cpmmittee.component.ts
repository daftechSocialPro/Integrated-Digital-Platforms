import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import { ComiteeAdd, CommitteeView } from '../../../../model/PM/committeeDto';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-cpmmittee',
  templateUrl: './update-cpmmittee.component.html',
  styleUrls: ['./update-cpmmittee.component.css']
})
export class UpdateCpmmitteeComponent implements OnInit {

  @Input() comitee!:CommitteeView;
  updateComiteeForm!: FormGroup;



  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private pmService : PMService,
    private commonService : CommonService,
    
  ) {


  }


  ngOnInit(): void { 
   
    this.updateComiteeForm = this.formBuilder.group({
      CommitteeName: [this.comitee.name, Validators.required],
      Remark : [this.comitee.remark,Validators.required]
    })

  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {
    if (this.updateComiteeForm.valid) {

      let comitee: ComiteeAdd = {
        id:this.comitee?.id,
        name: this.updateComiteeForm.value.CommitteeName,
        remark: this.updateComiteeForm.value.Remark,
        
      }

      this.pmService.updateComittee(comitee).subscribe({

        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Committee Successfully Updated' });              
          
 
          this.closeModal()

        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went worng', detail: err });              
          
        }
      })


    }

  }
}
