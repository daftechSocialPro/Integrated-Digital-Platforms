import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BeginngBalanceDetailDto, BeginningBalancePostDto } from 'src/app/model/Finance/IBeginningBalanceDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-beginning-balance',
  templateUrl: './add-beginning-balance.component.html',
  styleUrls: ['./add-beginning-balance.component.css']
})
export class AddBeginningBalanceComponent implements OnInit{

  user!: UserView
  accountingPeriodDropDown!: SelectList[]
  beginningBalanceForm!: FormGroup
  chartOfAccountsDropDown!: SelectList[]
  beginningBalanceDetailList: BeginngBalanceDetailDto[] = []
  addBeginningBalanceDetailList: BeginngBalanceDetailDto = new BeginngBalanceDetailDto();

  constructor(
    private financeService : FinanceService, 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dropDownService: DropDownService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal,
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getAccountingPeriodDropDown()
    this.getChartOfAccountsDropDown()
    this.beginningBalanceForm = this.formBuilder.group({
      accountingPeriodId: ['', Validators.required],
      totalCredit: [0, Validators.required],
      totalDebit: [0, Validators.required],
      remark: ['']
    })
      
  }

  getAccountingPeriodDropDown(){
    this.dropDownService.getAccountingPeriodDropDown().subscribe({
      next: (res) => {
        this.accountingPeriodDropDown = res
      }
    })
  }

  getChartOfAccountsDropDown(){
    this.dropDownService.getChartOfAccountsDropDown().subscribe({
      next: (res) =>{
        this.chartOfAccountsDropDown = res
      }
    })
  }

  removeData(ChartOfAccountId: string) {
    this.beginningBalanceDetailList = this.beginningBalanceDetailList.filter(x => x.chartOfAccountId != ChartOfAccountId);
  }



  newRow() {
    if (this.addBeginningBalanceDetailList.chartOfAccountId) {
      
      
      this.chartOfAccountsDropDown.some(x => {
        if (x.id == this.addBeginningBalanceDetailList.chartOfAccountId) {
          this.addBeginningBalanceDetailList.chartOfAccountName = x.name;
        }
      });

      this.beginningBalanceDetailList.unshift(this.addBeginningBalanceDetailList);
    }
    //this.items = "";
    this.addBeginningBalanceDetailList = new BeginngBalanceDetailDto();
  }

  submit(){
    if(this.beginningBalanceForm.valid){
      const beginningBalanceData: BeginningBalancePostDto = {
        accountingPeriodId: this.beginningBalanceForm.value.accountingPeriodId,
        totalCredit: this.beginningBalanceForm.value.totalCredit,
        totalDebit: this.beginningBalanceForm.value.totalDebit,
        remark: this.beginningBalanceForm.value.remark,
        createdById: this.user.userId,
        begningBalanceDetails: this.beginningBalanceDetailList
      }
      console.log("beginningBalanceData",beginningBalanceData)

      this.financeService.addBegnningBalance(beginningBalanceData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.beginningBalanceDetailList = [];
            this.addBeginningBalanceDetailList = new BeginngBalanceDetailDto();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
          }
        }, error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
    }
  }
  closeModal() {
    this.activeModal.close();
  }
}
