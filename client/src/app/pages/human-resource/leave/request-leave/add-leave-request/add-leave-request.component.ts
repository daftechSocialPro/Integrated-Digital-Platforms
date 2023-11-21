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
    private dropDownService: DropDownService,
    private userService: UserService) {

    this.LeaveRequestForm = this.formBuilder.group({

      leaveTypeId: ['', Validators.required],
      totalDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      reason: ['']
    })
  }


  handleChange(option: boolean) {
    if (option) {
      this.selectEmployeee = this.userService.getCurrentUser().employeeId
    }
    this.isDisabled = option;
  }
  getEmployees() {

    this.dropDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.employeeList = res
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

        employeeId: this.selectEmployeee,
        leaveTypeId: this.LeaveRequestForm.value.leaveTypeId,
        fromDate: this.LeaveRequestForm.value.fromDate,
        totalDate: this.LeaveRequestForm.value.totalDate,
        reason: this.LeaveRequestForm.value.reason

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

    if (event) {
      this.selectEmployeee = event
    }
  }

  verifyFromDate(date: string) {

    var fromDate = new Date(date)
    var toDate = new Date()
    var timeDifference = fromDate.getTime() - toDate.getTime();
    var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    var maxDays = 0

    if (daysDifference < 0) {
      this.messageService.add({ severity: 'error', summary: 'Date Selection Error', detail: 'You entered a date that is earlier than today!!!' });
      this.LeaveRequestForm.controls['fromDate'].setValue(null)
    }
    else {

      this.hrmService.getHrmSettings().subscribe({
        next: (res) => {
          maxDays = res.filter(x => x.generalSetting == "LEAVEREQUESTDAYSBEFORE")![0]!.value

          if (daysDifference <= maxDays) {
            this.messageService.add({ severity: 'error', summary: 'Date Selection Error', detail: `You can not request a leave before ${maxDays} days` });
            this.LeaveRequestForm.controls['fromDate'].setValue(null)
          }
          this.hrmService.getEmployeeLeavePlan(this.userService.getCurrentUser().employeeId).subscribe({
            next: (res) => {
              
              var result = res.filter(x => x.leavePlanSettingStatus == "APPROVED")
              if (result!.length > 0) {
                var frommDate = new Date( result[0].fromDate)
                var toDate = new Date (result[0].toDate)
                console.log(frommDate,toDate,fromDate.getDate())
                console.log(fromDate >= frommDate && fromDate <= toDate)

                if (!(fromDate.getTime() >= frommDate.getTime() && fromDate.getTime() <= toDate.getTime())) {
                  this.messageService.add({ severity: 'error', summary: 'Date Selection Error', detail: `You can not request a leave your leave plan is from ${fromDate} - ${toDate}` });
                  this.LeaveRequestForm.controls['fromDate'].setValue(null)
                }
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Date Selection Error', detail: `The leave plan has not been set or no approved leave plan exists. Please configure the leave plan settings.` });
                this.LeaveRequestForm.controls['fromDate'].setValue(null)
              }

            }
          })

        }
      })
    }
  }
  roleMatch(value: string[]) {
    return this.userService.roleMatch(value)
  }
}
