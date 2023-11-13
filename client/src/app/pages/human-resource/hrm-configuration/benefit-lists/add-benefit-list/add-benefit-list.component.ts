import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddBenefitListDto, BenefitListDto } from 'src/app/model/HRM/IBenefitListDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-benefit-list',
  templateUrl: './add-benefit-list.component.html',
  styleUrls: ['./add-benefit-list.component.css']
})

export class AddBenefitListComponent implements OnInit {

  benefitFormG!: FormGroup;
  user !: UserView
  @Input() benefit !: BenefitListDto;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (this.benefit != null) {
      this.benefitFormG = this.formBuilder.group({
        name: [this.benefit.name, Validators.required],
        amharicName: [this.benefit.amharicName],
        taxable: [this.benefit.taxable, Validators.required],
        addOnContract: [this.benefit.addOnContract, Validators.required],
      });
    }
    else {
      this.benefitFormG = this.formBuilder.group({
        name: ['', Validators.required],
        amharicName: [''],
        taxable: [false, Validators.required],
        addOnContract: [false, Validators.required],
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private userService: UserService,
    private messageService: MessageService) {
  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.benefitFormG.valid) {
      var benefitlst: AddBenefitListDto = {
        name: this.benefitFormG.value.name,
        amharicName: this.benefitFormG.value.amharicName,
        taxable: this.benefitFormG.value.taxable,
        addOnContract: this.benefitFormG.value.addOnContract,
        createdById: this.user.userId
      }

      if (this.benefit != null) {
        benefitlst.id = this.benefit.id;
        this.hrmService.updateBenefitList(benefitlst).subscribe({
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
        this.hrmService.addBenefitList(benefitlst).subscribe({
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
}
