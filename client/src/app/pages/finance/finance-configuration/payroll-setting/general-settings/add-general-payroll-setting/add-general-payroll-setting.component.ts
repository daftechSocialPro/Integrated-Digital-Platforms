import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { GeneralSettingPostDto } from 'src/app/model/Finance/IPayrollSettingDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-general-payroll-setting',
  templateUrl: './add-general-payroll-setting.component.html',
  styleUrls: ['./add-general-payroll-setting.component.css']
})
export class AddGeneralPayrollSettingComponent implements OnInit {

  user!: UserView
  generalSettingForm!: FormGroup 

  generalPayrollSettingDropdown = [
    {name:"Pension (Employee) ",value:"PENSIONEMPLOYEE"},
    {name:"Pension (Company)",value:"PENSIONCOMPANY"},
    {name:"Provident Fund",value:"PROVIDENTFUND"},
    {name:"Over-Time (Normal)",value:"NORMALOT"},
    {name:"Over-Time (Night)",value:"NIGHTOT"},
    {name:"Over-Time (Day Off)",value:"DAYOFFOT"},
    {name:"Over-Time (Holiday)",value:"HOLIDAYOT"},
  ]
 
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.generalSettingForm = this.formBuilder.group({
      value: ["", Validators.required],
      generalPSetting: ["",Validators.required]
    })

  }

  submit(){
    if(this.generalSettingForm.valid){
      const generalSetting: GeneralSettingPostDto = {
        generalPSetting: this.generalSettingForm.value.generalPSetting,
        value: this.generalSettingForm.value.value,
        createdById: this.user.userId

      }

      this.financeService.addGeneralPayrollSetting(generalSetting).subscribe({
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
