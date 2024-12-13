import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddLoanSettingDto, LoanSettingDto } from 'src/app/model/HRM/ILoanSettingDto';
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
  @Input() loanSetting !: LoanSettingDto;
  isAdvance: boolean = false;

  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser();
    if (this.loanSetting){
      this.LoanSettingForm = this.formBuilder.group({
        loanName: [this.loanSetting.loanName, Validators.required],
        amharicName:[this.loanSetting.amharicName,Validators.required],
        typeOfLoan:[this.loanSetting.typeOfLoan, Validators.required],
        numberOfMonths:[this.loanSetting.numberOfMonths, Validators.required],
        maxLoanAmmount:[this.loanSetting.maxLoanAmmount, Validators.required],
        paymentYear:[this.loanSetting.paymentYear, Validators.required],
        minDeductedPercent:[this.loanSetting.minDeductedPercent, Validators.required],
        maxDeductedPercent:[this.loanSetting.maxDeductedPercent, Validators.required],
        remark:[this.loanSetting.remark],
    });
    }else{
    this.LoanSettingForm = this.formBuilder.group({
      loanName: ['', Validators.required],
      amharicName:['',Validators.required],
      typeOfLoan:[0, Validators.required],
      numberOfMonths:[null,],
      maxLoanAmmount:[null, ],
      paymentYear:[null, ],
      minDeductedPercent:[null, ],
      maxDeductedPercent:[null, ],
      remark:[null],
  });
}
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

  changeLoan(value: any){
    this.isAdvance = false;
   if( value.target.value == 0){
    this.isAdvance = true;
   }
      
  }

  submit (){

    if (this.LoanSettingForm.valid){
      var loanSetting : AddLoanSettingDto ={
        loanName : this.LoanSettingForm.value.loanName,
        amharicName : this.LoanSettingForm.value.amharicName,
        typeOfLoan: parseInt(this.LoanSettingForm.value.typeOfLoan),
        maxDeductedPercent: this.LoanSettingForm.value.maxDeductedPercent,
        minDeductedPercent: this.LoanSettingForm.value.minDeductedPercent,
        maxLoanAmmount: this.LoanSettingForm.value.maxLoanAmmount,
        paymentYear: this.LoanSettingForm.value.paymentYear,
        remark: this.LoanSettingForm.value.remark,
        createdById : this.user.userId
      }
      if(this.loanSetting){
        loanSetting.id  = this.loanSetting.id

        this.hrmService.updateLoanSetting(loanSetting).subscribe({
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
      else{
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
}