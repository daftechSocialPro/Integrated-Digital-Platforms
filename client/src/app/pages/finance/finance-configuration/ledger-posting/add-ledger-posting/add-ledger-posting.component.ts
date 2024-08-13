import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { SelectList } from 'src/app/model/common';
import { AddLedgerPostingAccountDto } from 'src/app/model/Finance/ITaxRateDto';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-ledger-posting',
  templateUrl: './add-ledger-posting.component.html',
  styleUrls: ['./add-ledger-posting.component.css']
})
export class AddLedgerPostingComponent implements OnInit {

  ledgerForm!: FormGroup;
  user !: UserView;
  chartofAccount !:  SelectList[];
  ledgerType = [
    { value: 0, name: "Casher Account" },
    { value: 1, name: "Bank Account" },
    { value: 2, name: "Witholding Account" },
    { value: 3, name: "Vat Account" },
  ];



  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService) { }

  ngOnInit(): void {
    this.getchartOfAccountDropDown();
    this.user = this.userService.getCurrentUser();
    this.ledgerForm = this.formBuilder.group({
      journalOption: [Validators.required],
      chartOfAccountId: [Validators.required],
    });
  }

  getchartOfAccountDropDown() {
    this.dropDownService.getChartOfAccountsDropDown().subscribe({
      next: (res) => {
        this.chartofAccount = res
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.ledgerForm.valid) {
      var ledgerPostDto: AddLedgerPostingAccountDto = {
        journalOption: parseInt(this.ledgerForm.value.journalOption),
        chartOfAccountId: this.ledgerForm.value.chartOfAccountId,
        createdById: this.user.userId,
      }
      this.financeService.addLedgerPosting(ledgerPostDto).subscribe({
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