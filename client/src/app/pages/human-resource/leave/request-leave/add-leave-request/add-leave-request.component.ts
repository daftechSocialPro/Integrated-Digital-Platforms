import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LeaveRequestPostDto, LeaveTypeGetDto } from 'src/app/model/HRM/ILeaveDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-leave-request',
  templateUrl: './add-leave-request.component.html',
  styleUrls: ['./add-leave-request.component.css']
})
export class AddLeaveRequestComponent implements OnInit {


  @Output() result = new EventEmitter<boolean>();

  isDisabled: boolean = true


  employeeList: SelectList[] = [];
  employee !: SelectList;
  selectEmployeee !: string
  LeaveTypes!: SelectList[]
  LeaveRequestForm!: FormGroup
  ngOnInit(): void {

    this.selectEmployeee = this.userService.getCurrentUser().employeeId
    this.getLeaveTyepes()
    this.getEmployees()

  }
  constructor(
    private dopdownService: DropDownService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private messageService: MessageService,
    private userService: UserService) {

    this.LeaveRequestForm = this.formBuilder.group({
     
      leaveTypeId: ['', Validators.required],
      totalDate: ['', Validators.required],
      fromDate: ['', Validators.required]
    })
  }


  handleChange(option: boolean) {
    if (option) {
      this.selectEmployeee = this.userService.getCurrentUser().employeeId
    }
    this.isDisabled = option;
  }
  getEmployees() {

    this.hrmService.getEmployees().subscribe({
      next: (res) => {
        this.employeeList = res.map(item => ({
          id: item.id,
          name: `${item.firstName} ${item.middleName}`
        }));

      }
      , error: (err) => {
        console.error(err)
      }
    })

  }
  getLeaveTyepes() {

    this.dopdownService.getLeaveTypesDropdown().subscribe({
      next: (res) => {
        this.LeaveTypes = res
      }
    })
  }
  submit() {

    if (this.LeaveRequestForm.valid) {

      var leaveRequestPost: LeaveRequestPostDto = {

        employeeId:this.selectEmployeee,
        leaveTypeId: this.LeaveRequestForm.value.leaveTypeId,
        fromDate: this.LeaveRequestForm.value.fromDate,
        totalDate: this.LeaveRequestForm.value.totalDate

      }
      console.log(leaveRequestPost)

      this.hrmService.requestLeave(leaveRequestPost).subscribe({

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

  closeModal() {
    this.activeModal.close()

  }
  selectEmployee(event: string) {

    if(event){
    this.selectEmployeee= event
  }
  }


}