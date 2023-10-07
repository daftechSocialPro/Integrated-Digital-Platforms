import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeHistoryDto, EmployeeSalaryGetDto, EmployeeSalryPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-history-salary',
  templateUrl: './history-salary.component.html',
  styleUrls: ['./history-salary.component.css']
})
export class HistorySalaryComponent implements OnInit {

  @Input() empHistory!: EmployeeHistoryDto
  salaryHistoryForm !: FormGroup;
  salrayHistories!: EmployeeSalaryGetDto[]
  remaining: number = 0

  updatehistory!: any
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {

    this.salaryHistoryForm = this.formBuilder.group({
      projectName: [null, Validators.required],
      amount: [null, Validators.required],
    })

    this.getEmpSalary();


  }

  getEmpSalary() {
    this.hrmService.getEmployeeSalaryHistory(this.empHistory.id).subscribe({
      next: (res) => {
        this.salrayHistories = res
        this.remaining = this.empHistory.salary - this.salrayHistories.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
      }
    })
  }

  addEmpSalary() {
    if (this.salaryHistoryForm.valid) {

      var remaining = !this.updatehistory ? this.remaining : this.remaining + this.updatehistory.amount

      if (remaining - this.salaryHistoryForm.value.amount >= 0) {



        if (!this.updatehistory) {
          var empSalary: EmployeeSalryPostDto = {
            employeeDetailId: this.empHistory.id,
            amount: this.salaryHistoryForm.value.amount,
            projectName: this.salaryHistoryForm.value.projectName,

          }
          this.hrmService.addEmployeeSalaryHistory(empSalary).subscribe({
            next: (res) => {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getEmpSalary()
              this.salaryHistoryForm.reset()
            },

          })
        }
        else {
          var empSalary2: EmployeeSalaryGetDto = {
            id: this.updatehistory.id,
            amount: this.salaryHistoryForm.value.amount,
            projectName: this.salaryHistoryForm.value.projectName,

          }
          this.hrmService.updateEmployeeSalaryHistory(empSalary2).subscribe({
            next: (res) => {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getEmpSalary()
              this.updatehistory= null 
              this.salaryHistoryForm.reset()
            },

          })

        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'error', detail: "Error the amount You entered is greater than remaining!!!  " });


      }



    }
    else {


    }
  }

  updateSalaryHistory(item: EmployeeSalaryGetDto) {

    this.updatehistory = item
    this.salaryHistoryForm.controls['projectName'].setValue(item.projectName)
    this.salaryHistoryForm.controls['amount'].setValue(item.amount)
  }

  deleteEmployeeHistory(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Salary History?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployeeSalaryHistory(id).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEmpSalary()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  }
  closeModal() {
    this.activeModal.close()
  }
  submit() {

  }

}
