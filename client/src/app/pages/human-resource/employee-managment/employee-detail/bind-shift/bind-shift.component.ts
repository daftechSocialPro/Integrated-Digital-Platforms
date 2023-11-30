import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BindShiftDto } from 'src/app/model/HRM/IShiftSettingDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bind-shift',
  templateUrl: './bind-shift.component.html',
  styleUrls: ['./bind-shift.component.css']
})
export class BindShiftComponent implements OnInit {

  @Input() employeeId!: string

  bindShiftForm !: FormGroup;
  shiftDropDown: SelectList[] = [];
  user !: UserView

  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private dropService: DropDownService
  ) {

    this.bindShiftForm = this.formBuilder.group({
      shiftId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getShiftDropDown();
  }

  closeModal() {
    this.activeModal.close()
  }

  getShiftDropDown() {
    this.dropService.getShiftDropDown().subscribe({
      next: (res) => {
        this.shiftDropDown = res;
      }
    })
  }

  submit() {
    debugger;
    if (this.bindShiftForm.valid) {

      var bindShift: BindShiftDto = {
        employeeId : this.employeeId,
        shiftId: this.bindShiftForm.value.shiftId,
        createdById: this.user.userId,
      }
      this.hrmService.bindShift(bindShift).subscribe(
        {
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
        }
      );
    }

  }

}