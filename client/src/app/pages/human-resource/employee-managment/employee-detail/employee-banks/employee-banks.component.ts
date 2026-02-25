import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddEmployeeBankDto, EmployeeBankListDto } from 'src/app/model/HRM/IEmployeeBankDto';
import { BankSelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-banks',
  templateUrl: './employee-banks.component.html',
  styleUrls: ['./employee-banks.component.css']
})

export class EmployeeBanksComponent implements OnInit {


  @Input() employeeId!: string;
  @Input() employmentStatus!: string;

  employeeBankForm !: FormGroup;
  bankList!: EmployeeBankListDto[];
  user !: UserView;
  bankDigit!: number ;
  bankLists !: BankSelectList[];

  position: string = 'center';
  isUpdate: boolean = false;
  employeeBankId!: string;

  constructor(
    private hrmService: HrmService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private activeModal: NgbActiveModal,
    private dropService: DropDownService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.getEmployeeBanks();
    this.getBankList();
    this.user = this.userService.getCurrentUser()
    this.employeeBankForm = this.formBuilder.group({
      bankId: [null, Validators.required],
      bankAccountNo: [null, [Validators.required, Validators.pattern("[0-9]+")]],
      isSalaryBank: [false, Validators.required]
    });
  }


  getEmployeeBanks() {
    this.hrmService.employeeBanks(this.employeeId).subscribe({
      next: (res) => {
        this.bankList = res
      }
    });
  }

  getBankList(){
    this.dropService.getBankDropDowns().subscribe({
      next: (res) => {
        this.bankLists = res
      }
    });
  }

  changeBankDigit(digitNumber: any){
    this.bankDigit =  Number(this.bankLists.find(X => X.id == digitNumber.value)?.bankDigit);
 }

  submit() {
    if (this.employeeBankForm.valid) {

      var employeeBank: AddEmployeeBankDto = {
        bankId: this.employeeBankForm.value.bankId,
        accountNumber: this.employeeBankForm.value.bankAccountNo,
        createdById: this.user.userId,
        isSalaryBank: this.employeeBankForm.value.isSalaryBank,
        employeeId: this.employeeId
      }
      if (this.isUpdate) {
        employeeBank.id = this.employeeBankId;
        this.hrmService.updateEmployeeBank(employeeBank).subscribe(
          {
            next: (res) => {
              if (res.success) {
                this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                this.getEmployeeBanks();
                this.employeeBankForm.reset();
                this.isUpdate = false;
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
              }
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
            }
          }
        )
      } else {
        this.hrmService.addEmployeeBank(employeeBank).subscribe(
          {
            next: (res) => {
              if (res.success) {
                this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                this.getEmployeeBanks();
                this.employeeBankForm.reset();
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
              }
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
            }
          }
        )
      }
    }
  }

  onEdit(bank: EmployeeBankListDto) {
    this.isUpdate = true;
    this.employeeBankId = bank.id;
    
    this.employeeBankForm.patchValue({
      bankId: bank.bankId,
      bankAccountNo: bank.accountNumber,
      isSalaryBank: bank.isSalaryBank
    });

    const selectedBank = this.bankLists.find(x => x.id === bank.bankId);
    if (selectedBank) {
      this.bankDigit = Number(selectedBank.bankDigit);
    }
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this bank account?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployeeBank(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getEmployeeBanks();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          }
        });
      },
      key: 'positionDialog'
    });
  }

  closeModal() {
    this.activeModal.close()
  }




}