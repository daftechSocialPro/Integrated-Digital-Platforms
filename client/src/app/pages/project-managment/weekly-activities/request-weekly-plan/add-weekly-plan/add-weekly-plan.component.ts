import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LeaveRequestPostDto } from 'src/app/model/HRM/ILeaveDto';
import { IWeeklyPlanDto } from 'src/app/model/PM/WeeklyPlanDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-weekly-plan',
  templateUrl: './add-weekly-plan.component.html',
  styleUrls: ['./add-weekly-plan.component.css']
})
export class AddWeeklyPlanComponent implements OnInit {


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
    private pmService: PMService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private userService: UserService) {

    this.LeaveRequestForm = this.formBuilder.group({

      activity: ['', Validators.required],
      placeOfWork: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],

   
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

      var leaveRequestPost: IWeeklyPlanDto = {

        employeeId: this.selectEmployeee,
        activity: this.LeaveRequestForm.value.activity,
        placeOfWork: this.LeaveRequestForm.value.placeOfWork,
        fromDate: this.LeaveRequestForm.value.fromDate,
        toDate: this.LeaveRequestForm.value.toDate

      }


      this.pmService.addWeeklyPlan(leaveRequestPost).subscribe({

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

  roleMatch(value: string[]) {
    return this.userService.roleMatch(value)
  }
}
