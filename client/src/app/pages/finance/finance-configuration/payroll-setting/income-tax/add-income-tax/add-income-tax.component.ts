import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { IncomeTaxDto } from 'src/app/model/Finance/IPayrollSettingDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-income-tax',
  templateUrl: './add-income-tax.component.html',
  styleUrls: ['./add-income-tax.component.css']
})
export class AddIncomeTaxComponent implements OnInit {
  @Input() incomeTax!: IncomeTaxDto
  user!: UserView
  incomeTaxForm!: FormGroup


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    if(this.incomeTax){
      this.incomeTaxForm = this.formBuilder.group({
        startingAmount:[this.incomeTax.startingAmount,Validators.required],
        endingAmount:[this.incomeTax.endingAmount,Validators.required],
        percent:[this.incomeTax.percent,Validators.required],
        deductable:[this.incomeTax.deductable,Validators.required],
        endDate:[this.incomeTax.endDate.toString().split('T')[0],Validators.required],
        isActive:[this.incomeTax.isActive],
      })
    }
    else{
      this.incomeTaxForm = this.formBuilder.group({
        startingAmount:["",Validators.required],
        endingAmount:["",Validators.required],
        percent:["",Validators.required],
        deductable:["",Validators.required],
        endDate:[null,Validators.required],
        isActive:[true],
      })
    }

  }

  
  submit() {

    if (this.incomeTaxForm.valid) {

      if (this.incomeTax) {
        var incomeTaxPost: IncomeTaxDto = {
          id: this.incomeTax.id,
          createdById: this.user.userId,
          startingAmount: this.incomeTaxForm.value.startingAmount,
          endingAmount: this.incomeTaxForm.value.endingAmount,
          percent: this.incomeTaxForm.value.percent,
          deductable: this.incomeTaxForm.value.deductable,
          endDate: this.incomeTaxForm.value.endDate,
          isActive: this.incomeTaxForm.value.isActive,
          
        }

        this.financeService.updateIncomeTax(incomeTaxPost).subscribe({
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
      else {
        var incomeTaxPost: IncomeTaxDto = {
          createdById: this.user.userId,
          startingAmount: this.incomeTaxForm.value.startingAmount,
          endingAmount: this.incomeTaxForm.value.endingAmount,
          percent: this.incomeTaxForm.value.percent,
          deductable: this.incomeTaxForm.value.deductable,
          endDate: this.incomeTaxForm.value.endDate,
          isActive: this.incomeTaxForm.value.isActive,
        }

        this.financeService.addIncomeTax(incomeTaxPost).subscribe({
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
  }

  closeModal() {
    this.activeModal.close();
  }

}
