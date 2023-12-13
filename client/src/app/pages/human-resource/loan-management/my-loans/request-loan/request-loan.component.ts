import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { LoanRequestDto } from 'src/app/model/HRM/ILoanManagmentDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.css']
})
export class RequestLoanComponent  implements OnInit {
 
  loanRequestForm!: FormGroup;
  user !: UserView
  @Input() employeeId!: string; 
  loanSettingList: SelectList[] = [];

  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser()   
    this.getDropDown();
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private userService : UserService,
    private dropDownService: DropDownService,
    private messageService: MessageService) { 

      this.loanRequestForm = this.formBuilder.group({
        loanSettingId: ['', Validators.required],
        totalMoneyRequest: [null,Validators.required],
        deductionRequest: [null,Validators.required]
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }

  getDropDown() {
    this.dropDownService.getLoanTypeDropDown().subscribe({
      next: (res) => {
        this.loanSettingList = res;
      }
    });
  }
  
  submit (){
    if (this.loanRequestForm.valid){
      var requestLoan : LoanRequestDto ={
        createdById: this.user.userId,
        employeeId: this.employeeId,
        loanSettingId: this.loanRequestForm.value.loanSettingId,
        deductionRequest: this.loanRequestForm.value.deductionRequest,
        totalMoneyRequest: this.loanRequestForm.value.deductionRequest,
      }

      this.hrmService.requestLoan(requestLoan).subscribe({
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