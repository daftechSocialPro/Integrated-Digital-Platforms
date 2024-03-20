import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApprovePaymentDto } from 'src/app/model/Finance/IPaymentDto';
import { CalculatePayrollDto, CheckOrApprovePayrollDto, PayrollGetDto } from 'src/app/model/Finance/IPayrollDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  payrollDataList: PayrollGetDto[]
  payrollParam: CalculatePayrollDto = new CalculatePayrollDto()
  reCalculate: boolean = false; 
  user!: UserView
  minDate!: Date
  maxDate!: Date


  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal,
    private messageService: MessageService,
    private userService: UserService,
    private confirmationService : ConfirmationService,
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getDateRange()
    this.getPayrollDataList()
  }

  getDateRange(){
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const isLastFiveDaysOfMonth = currentDate.getDate() >= lastDayOfMonth - 4;

    if (isLastFiveDaysOfMonth) {
      this.minDate = new Date(currentYear, currentMonth, 1);
      this.maxDate = new Date(currentYear, currentMonth + 1, 0);
    } else {
      this.minDate = new Date(currentYear, currentMonth - 1, 1);
      this.maxDate = new Date(currentYear, currentMonth, 0);
    }

  }
  getPayrollDataList(){
    this.financeService.getPayrollDataList().subscribe({
      next : (res) => {
        this.payrollDataList = res
      }
    })
  }

  calculatePayroll(){
    
    this.payrollParam.recalculate = this.reCalculate;
    this.payrollParam.userId = this.user.userId
    this.financeService.calculatePayroll(this.payrollParam).subscribe({
      next: (res) => {
        if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
          this.payrollParam = new CalculatePayrollDto();
          this.reCalculate = false
          this.getPayrollDataList();
          
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
        }
        if(res.data == true){
          
          this.confirmationService.confirm({
            message: `${res.message}<br>Do You Want To Recalculate`,
            header: 'Approve Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.reCalculate = res.data;
              this.calculatePayroll()
              
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
       
      }
    })
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  checkPayroll(payrollId: string){
    const checkPayrollData: CheckOrApprovePayrollDto ={
      payrollDataId: payrollId,
      employeeId: this.user.employeeId
    }
    this.financeService.checkPayroll(checkPayrollData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          this.getPayrollDataList();
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

  approvePayroll(payrollId: string){
    const approvePayrollData: CheckOrApprovePayrollDto ={
      payrollDataId: payrollId,
      employeeId: this.user.employeeId
    }
    this.financeService.approvePayroll(approvePayrollData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          this.getPayrollDataList();
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
