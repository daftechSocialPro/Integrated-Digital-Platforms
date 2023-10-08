import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { HrmSettingDto } from 'src/app/model/HRM/IHrmSettingDto';
import { LeavePlanSettingPostDto } from 'src/app/model/HRM/ILeaveDto';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-leave-setting',
  templateUrl: './add-leave-setting.component.html',
  styleUrls: ['./add-leave-setting.component.css']
})
export class AddLeaveSettingComponent implements OnInit {



  leaveSettingForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    
    private userService: UserService,
    private messageService: MessageService) {

    this.leaveSettingForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    })


  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.leaveSettingForm.valid) {

      var leaveSettingPost: LeavePlanSettingPostDto = {
        employeeId: this.user.employeeId,
        fromDate: this.leaveSettingForm.value.fromDate,
        toDate: this.leaveSettingForm.value.toDate,
        createdById: this.user.userId
      }


      this.hrmService.addEmployeeLeavePlan(leaveSettingPost).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })


    }

  }


}
