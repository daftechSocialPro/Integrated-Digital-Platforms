import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BenefitListDto } from 'src/app/model/HRM/IBenefitListDto';
import { AddBankDto, BankListDto } from 'src/app/model/configuration/IBankListDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-bank-list',
  templateUrl: './add-bank-list.component.html',
  styleUrls: ['./add-bank-list.component.css']
})
export class AddBankListComponent  implements OnInit {

  bankFormGroup!: FormGroup;
  user !: UserView
  @Input() bank !: BankListDto;
  totDigit: number = 0;

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    if (this.bank != null) {
      this.totDigit = this.bank.bankDigitNumber;
      this.bankFormGroup = this.formBuilder.group({
        bankName: [this.bank.bankName, Validators.required],
        amharicName: [this.bank.amharicName],
        address: [this.bank.address],
        amharicAddress: [this.bank.amharicAddress],
        branch: [this.bank.branch],
        amharicBranch: [this.bank.amharicBranch],
        bankDigitNumber: [this.bank.bankDigitNumber, Validators.required],
        accountNumber: [this.bank.accountNumber, Validators.required ],
      });
    }
    else {
      this.bankFormGroup = this.formBuilder.group({
        bankName: ['', Validators.required],
        amharicName: [''],
        address: [''],
        amharicAddress: [''],
        branch: [''],
        amharicBranch: [''],
        bankDigitNumber: [null, Validators.required,,Validators.maxLength(this.totDigit), Validators.minLength(this.totDigit)],
        accountNumber: [null, Validators.required],
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private userService: UserService,
    private messageService: MessageService) {
  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.bankFormGroup.valid) {
      var bank: AddBankDto = {
        bankName: this.bankFormGroup.value.bankName,
        amharicName: this.bankFormGroup.value.amharicName,
        address: this.bankFormGroup.value.address,
        amharicAddress: this.bankFormGroup.value.amharicAddress,
        branch: this.bankFormGroup.value.branch,
        amharicBranch: this.bankFormGroup.value.amharicBranch,
        accountNumber: this.bankFormGroup.value.accountNumber,
        bankDigitNumber: this.bankFormGroup.value.bankDigitNumber,
        createdById: this.user.userId
      }
      if (this.bank != null) {
        bank.id = this.bank.id;
        this.configService.updateBank(bank).subscribe({
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
        });
      }
      else {
        this.configService.addBank(bank).subscribe({
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
        });
      }
    }
  }

  OnDigitChange(value: any){
    this.totDigit = value.value;
  }
}