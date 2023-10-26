import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddLoanSettingDto, LoanSettingDto } from 'src/app/model/HRM/ILoanSettingDto';
import { AddPerformancePlanDetailDto } from 'src/app/model/HRM/IPerformancePlanDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-loan-setting',
  templateUrl: './add-loan-setting.component.html',
  styleUrls: ['./add-loan-setting.component.css']
})
export class AddLoanSettingComponent implements OnInit {

  LoanSettingForm!: FormGroup;
  user !: UserView
  @Input() loanSetting !: LoanSettingDto 

  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser();
    this.LoanSettingForm = this.formBuilder.group({
      loanName: ['', Validators.required],
      typeOfLoan:[0, Validators.required],
      maxLoanAmmount:[null, Validators.required],
      paymentYear:[null, Validators.required],
      minDeductedPercent:[null, Validators.required],
      maxDeductedPercent:[null, Validators.required],
      remark:[null],
  });
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private userService : UserService,
    private messageService: MessageService) { 
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.LoanSettingForm.valid){
      var loanSetting : AddLoanSettingDto ={
        loanName : this.LoanSettingForm.value.loanName,
        typeOfLoan: parseInt(this.LoanSettingForm.value.typeOfLoan),
        maxDeductedPercent: this.LoanSettingForm.value.maxDeductedPercent,
        minDeductedPercent: this.LoanSettingForm.value.minDeductedPercent,
        maxLoanAmmount: this.LoanSettingForm.value.maxLoanAmmount,
        paymentYear: this.LoanSettingForm.value.paymentYear,
        remark: this.LoanSettingForm.value.remark,
        createdById : this.user.userId
      }
      this.hrmService.addLoanSetting(loanSetting).subscribe({
        next:(res)=>{
          if (res.success){
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
          }
        },
        error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
        }
      });
    }
  }
}