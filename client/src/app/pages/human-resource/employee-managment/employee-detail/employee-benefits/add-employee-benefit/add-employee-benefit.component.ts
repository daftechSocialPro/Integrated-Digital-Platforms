import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddEmployeeBenefitDto } from 'src/app/model/HRM/IEmployeeBenefitDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-benefit',
  templateUrl: './add-employee-benefit.component.html',
  styleUrls: ['./add-employee-benefit.component.css']
})

export class AddEmployeeBenefitComponent implements OnInit {

  @Input() employeeId!: string

  employeeBenefitForm !: FormGroup;
  benefitsDropDown: SelectList[] = [];
  typeOfBenefitList: any[] = [
    {value: 0, name : "Percentile"},
    {value: 1, name : "Number"},
  ]

  user !: UserView

  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private dropService: DropDownService
  ) {

    this.employeeBenefitForm = this.formBuilder.group({

      benefitListId: [null, Validators.required],
      typeOfBenefit: [null, Validators.required],
      ammount: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getBenefitDropDown();
  }

  closeModal() {
    this.activeModal.close()
  }

  getBenefitDropDown() {
    this.dropService.getBenefitDropDowns().subscribe({
      next: (res) => {
        this.benefitsDropDown = res;
      }
    })
  }

  submit() {
    debugger;
    if (this.employeeBenefitForm.valid) {

      var employeeBenefit: AddEmployeeBenefitDto = {

        benefitListId: this.employeeBenefitForm.value.benefitListId,
        typeOfBenefit: this.employeeBenefitForm.value.typeOfBenefit,
        ammount: this.employeeBenefitForm.value.ammount,
        createdById: this.user.userId,
        employeeId: this.employeeId
      }
      this.hrmService.addEmployeeBenefit(employeeBenefit).subscribe(
        {
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
        }
      )

    }

  }

}