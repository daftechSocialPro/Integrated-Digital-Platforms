import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AccountingPeriodPostDto } from 'src/app/model/Finance/IAccountingPeriodDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';
declare const $: any

@Component({
  selector: 'app-add-accounting-period',
  templateUrl: './add-accounting-period.component.html',
  styleUrls: ['./add-accounting-period.component.css']
})
export class AddAccountingPeriodComponent implements OnInit {

  user!:UserView
  //accountingPeriod!: AccountingPeriodPostDto
  accountingPeriodForm!: FormGroup;

  accountinPeriodtype = [
    {name:"Twelve (12)", value:"TWELVE"},
    {name:"Twenty Four (24)", value:"TWENTYFOUR"},
    {name:"Thirty Six (36)", value:"THIRTYSIX"},
    {name:"Forty Eight (48)", value:"FORTYEIGHT"},
  ]

  calanderType =[
    {name:"Ethiopian (E.C.)", value:"ETHIOPIAN"},
    {name:"Gregorian (G.C.)", value:"GREGORIAN"},
  ]

  ethiopianDate:string


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService
  ){}


  ngOnInit(): void {

      this.user = this.userService.getCurrentUser()
      this.accountingPeriodForm = this.formBuilder.group({
        accountingPeriodType:['',Validators.required],
        calanderType:['',Validators.required],
        description:['',Validators.required],
        startDate:[null]
      })

      $('#StartDate').calendarsPicker({
                calendar: $.calendars.instance('ethiopian', 'am'),
  
        onSelect: (date: any) => {
        
          this.ethiopianDate = date[0]._month+"/"+date[0]._day+"/"+date[0]._year
         
        },
      })
  }


  submit() {

    if (this.accountingPeriodForm.valid) {

      
        var accountingPeriodPost: AccountingPeriodPostDto = {
          accountingPeriodType: this.accountingPeriodForm.value.accountingPeriodType,
          calanderType: this.accountingPeriodForm.value.calanderType,
          description: this.accountingPeriodForm.value.description,
          startDate:  this.accountingPeriodForm.value.startDate,
          ethiopianDate : this.ethiopianDate,
          createdById: this.user.userId,
          
        }

        this.financeService.addAccountingPeriod(accountingPeriodPost).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.accountingPeriodForm.reset();
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


  closeModal() {
    this.activeModal.close();
    
  }
}
