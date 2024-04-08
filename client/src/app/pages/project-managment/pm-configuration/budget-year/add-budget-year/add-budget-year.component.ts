import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { IBudgetYearDto } from 'src/app/model/PM/ITimePeriodDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-budget-year',
  templateUrl: './add-budget-year.component.html',
  styleUrls: ['./add-budget-year.component.css']
})
export class AddBudgetYearComponent implements OnInit {

  BudgetYear!: IBudgetYearDto
  BudgetYearForm!: FormGroup;
  user !: UserView;

  yearStatus = ["ACTIVE", "INACTIVE"]


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    if (this.BudgetYear) {
      this.BudgetYearForm = this.formBuilder.group({
        BudgetYearName: [this.BudgetYear.budgetYear, Validators.required],
        status: [this.BudgetYear.status]
      })
    }
    else {
      this.BudgetYearForm = this.formBuilder.group({
        BudgetYearName: ['', Validators.required],
        status: ['']


      })
    }

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private userService: UserService,
    private messageService: MessageService) {


   

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.BudgetYearForm.valid) {

      if (this.BudgetYear) {
        var BudgetYearPost: IBudgetYearDto = {
          budgetYear: this.BudgetYearForm.value.BudgetYearName,
          status: this.BudgetYearForm.value.status,
          id:this.BudgetYear.id

        }

        this.pmService.updateBudgetYear(BudgetYearPost).subscribe({
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
        var BudgetYearPost: IBudgetYearDto = {
          budgetYear: this.BudgetYearForm.value.BudgetYearName,
          createdById: this.user.userId

        }

        this.pmService.addBudgetYear(BudgetYearPost).subscribe({
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

}

