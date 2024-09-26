import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddShiftDetail } from 'src/app/model/HRM/IShiftSettingDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-shift-detail',
  templateUrl: './add-shift-detail.component.html',
  styleUrls: ['./add-shift-detail.component.css']
})
export class AddShiftDetailComponent implements OnInit {


  @Input() shiftId!: string;

  shiftFormGroup!: FormGroup;
  user !: UserView;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    this.shiftFormGroup = this.formBuilder.group({
      weekDays: ['', Validators.required],
      breakTime: ['', Validators.required],
    });

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private toastService: CommonService,
    private datePipe: DatePipe,
    private userService: UserService,
    private messageService: MessageService) {


  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.shiftFormGroup.valid) {

        var shiftSettingU: AddShiftDetail = {
          weekDays: this.shiftFormGroup.value.weekDays,
          breakTime: this.shiftFormGroup.value.breakTime,
          shiftId: this.shiftId,
          createdById:this.user.userId
        }
  
      this.hrmService.addShiftDetail(shiftSettingU).subscribe({
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
      });
    }
    

  }

}