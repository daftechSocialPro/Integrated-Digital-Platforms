import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LeaveBalancePostDto } from 'src/app/model/HRM/ILeaveDto';
import { SelectList } from 'src/app/model/common';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent implements OnInit {

  @Output() result = new EventEmitter<boolean>();

  isDisabled: boolean = true
  LeaveBalanceForm!: FormGroup
  employeeList: SelectList[] = [];
  employee !: SelectList;
  selectEmployeee !: string
  
  constructor(
    private activeModal :NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private hrmService : HrmService,
    private messageService : MessageService){

    this.LeaveBalanceForm = this.formBuilder.group({     
      currentBalance: ['', Validators.required],
      previousBalance: ['', Validators.required],
      previousExpDate: ['', Validators.required],
      leavesTaken: ['', Validators.required],
    })

  }
  ngOnInit(): void {
    this.selectEmployeee = this.userService.getCurrentUser().employeeId
    this.getEmployees()
    
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

  closeModal(){

    this.activeModal.close()
  }

  submit() {

    if (this.LeaveBalanceForm.valid) {


      var leaveBalancePost: LeaveBalancePostDto = {

        employeeId:this.selectEmployeee,
        currentBalance: this.LeaveBalanceForm.value.leaveTypeId,
        previousBalance: this.LeaveBalanceForm.value.fromDate,
        leavesTaken: this.LeaveBalanceForm.value.totalDate,
        previousExpDate:this.LeaveBalanceForm.value.previousExpDate

      }
    

      this.hrmService.addLeaveBalance(leaveBalancePost).subscribe({

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

  selectEmployee(event: string) {

    if(event){
    this.selectEmployeee= event
  }
  
  }
  

}
