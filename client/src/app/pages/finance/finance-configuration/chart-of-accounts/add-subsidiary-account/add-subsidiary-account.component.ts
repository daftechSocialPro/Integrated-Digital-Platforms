import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SubsidiaryAccountsGetDto, SubsidiaryAccountsPostDto } from 'src/app/model/Finance/IChartOfAccountsDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-subsidiary-account',
  templateUrl: './add-subsidiary-account.component.html',
  styleUrls: ['./add-subsidiary-account.component.css']
})
export class AddSubsidiaryAccountComponent implements OnInit {

  @Input() chartOfAccountId!: string
  @Input() subsidiaryAccount!: SubsidiaryAccountsGetDto
  user!: UserView
  subsidiaryAccountForm: FormGroup
  typeOfAccount = [
    { value: 0, name: "Project" },
    { value: 1, name: "NonProject" },
    { value: 2, name: "Both" },
  ]

  constructor(
    private financeService : FinanceService, 
    private formBuilder:FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    if(this.subsidiaryAccount){
      this.subsidiaryAccountForm = this.formBuilder.group({
        accountNo:[this.subsidiaryAccount.accountNo,Validators.required],
        description:[this.subsidiaryAccount.description,Validators.required],
        sequence:[this.subsidiaryAccount.sequence,Validators.required],
        typeOfAccount:[this.subsidiaryAccount.typeOfAccount,Validators.required]
      })
    }
    else{

      this.subsidiaryAccountForm = this.formBuilder.group({
        accountNo:["",Validators.required],
        description:["",Validators.required],
        sequence:["",Validators.required],
        typeOfAccount:["",Validators.required],
      })
    }
  }

  submit() {

    if (this.subsidiaryAccountForm.valid) {

      if (this.subsidiaryAccount) {
        var subsidiaryAccountPost: SubsidiaryAccountsPostDto = {
          id: this.subsidiaryAccount.id,
          description: this.subsidiaryAccountForm.value.description,
          accountNo: this.subsidiaryAccountForm.value.accountNo,
          sequence: this.subsidiaryAccountForm.value.sequence,
          typeOfAccount: parseInt(this.subsidiaryAccountForm.value.typeOfAccount),
          chartOfAccountId: this.chartOfAccountId,

          createdById: this.user.userId 
        }

        this.financeService.updateSubsidiaryAccount(subsidiaryAccountPost).subscribe({
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
        var subsidiaryAccountPost: SubsidiaryAccountsPostDto = {
          
          description: this.subsidiaryAccountForm.value.description,
          accountNo: this.subsidiaryAccountForm.value.accountNo,
          sequence: this.subsidiaryAccountForm.value.sequence,
          chartOfAccountId: this.chartOfAccountId,
          typeOfAccount: parseInt(this.subsidiaryAccountForm.value.typeOfAccount),
          createdById: this.user.userId 
        }

        this.financeService.addSubsidiaryAccount(subsidiaryAccountPost).subscribe({
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
