import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { BenefitPayrollPostDto } from 'src/app/model/Finance/IPayrollSettingDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-benefit-payroll',
  templateUrl: './add-benefit-payroll.component.html',
  styleUrls: ['./add-benefit-payroll.component.css']
})
export class AddBenefitPayrollComponent implements OnInit {

  user!: UserView
  benefitPayrollForm!: FormGroup
  payrollReportType =[
    {name:"Transport Fuel",value:"TRANSPORT_FUEL"},
    {name:"Communication",value:"COMMUNICATION"},
    {name:"Position",value:"POSITION"},
  ]
  benefitList!: SelectItem[]
  benefitSelectedList!: string[]


  

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService,
    private hrmService: HrmService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getBenefitList()
    this.benefitPayrollForm = this.formBuilder.group({
      payrollReportType:["",Validators.required],
      taxable:[false,Validators.required],
      benefitId:['']

    })

  }

  getBenefitList(){
    this.hrmService.getBenefitLists().subscribe({
      next: (res) => {
        this.benefitList = res.map(x => ({value: x.id, label: x.name}))
      }
    })
  }

  SelectItems(event: any){
    this.benefitSelectedList = event.value.map(x => (x.value))
  }
  submit() {

    if (this.benefitPayrollForm.valid) {


      var benefitPayroll: BenefitPayrollPostDto = {
        createdById: this.user.userId,
        benefitId: this.benefitSelectedList,
        taxable: this.benefitPayrollForm.value.taxable,
        payrollReportType: this.benefitPayrollForm.value.payrollReportType
      }

      this.financeService.addBenefitPayroll(benefitPayroll).subscribe({
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

  closeModal() {
    this.activeModal.close();
  }

}
