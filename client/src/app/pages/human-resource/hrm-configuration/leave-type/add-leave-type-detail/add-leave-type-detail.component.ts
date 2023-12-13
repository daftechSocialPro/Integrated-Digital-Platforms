import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddLeaveDetailDto } from 'src/app/model/HRM/ILeaveDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-leave-type-detail',
  templateUrl: './add-leave-type-detail.component.html',
  styleUrls: ['./add-leave-type-detail.component.css']
})
export class AddLeaveTypeDetailComponent implements OnInit{
 
  LeaveTypes!: SelectList[]
  @Input() leaveTypeId!: string;

  leaveFormGroup!: FormGroup;
  user !: UserView;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getLeaveTyepes();
    this.leaveFormGroup = this.formBuilder.group({
      takeFromLeaveTypeId: ['', Validators.required],
      order: ['', Validators.required],
    });
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private dopdownService: DropDownService,
    private datePipe: DatePipe,
    private userService: UserService,
    private messageService: MessageService) {


  }

  getLeaveTyepes() {
    this.dopdownService.getLeaveTypesDropdown().subscribe({
      next: (res) => {
        this.LeaveTypes = res
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.leaveFormGroup.valid) {

        var addLeaveTypeDetail: AddLeaveDetailDto = {
          leaveTypeId: this.leaveTypeId,
          order: this.leaveFormGroup.value.order,
          takeFromLeaveTypeId: this.leaveFormGroup.value.takeFromLeaveTypeId,
          createdById:this.user.userId
        }
  
      this.hrmService.addLeaveDetail(addLeaveTypeDetail).subscribe({
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


