import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import { ComiteeAdd } from '../../../../model/PM/committeeDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-comitee',
  templateUrl: './add-comitee.component.html',
  styleUrls: ['./add-comitee.component.css']
})
export class AddComiteeComponent implements OnInit {

  comiteeeForm!: FormGroup;
  user!: UserView


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private messageService: MessageService,

    private commonService: CommonService
  ) {

    this.comiteeeForm = this.formBuilder.group({
      CommitteeName: ['', Validators.required],
      Remark: [''],

    })

  }


  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.comiteeeForm.valid) {



      let comitee: ComiteeAdd = {
        name: this.comiteeeForm.value.CommitteeName,
        remark: this.comiteeeForm.value.Remark,
        createdBy: this.user.userId
      }

      this.pmService.createComittee(comitee).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Committee Successfully Created' });

          this.closeModal()

        },
        error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong' });

        }
      })


    }



  }

}
