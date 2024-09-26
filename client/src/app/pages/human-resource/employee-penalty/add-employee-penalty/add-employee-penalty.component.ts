import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddPenaltyDto } from 'src/app/model/HRM/IPenaltyListDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-penalty',
  templateUrl: './add-employee-penalty.component.html',
  styleUrls: ['./add-employee-penalty.component.css']
})
export class AddEmployeePenaltyComponent implements OnInit {

  employeePenaltyForm !: FormGroup;
  user !: UserView;
  employeeList: SelectList[] = [];
  recursive: boolean = false;
  fromSalary: boolean = false;
  penaltyType: any[] = [
    { value: 0, name: "ABSENT" },
    { value: 1, name: "LATE" },
    { value: 2, name: "OTHER" }
  ]
  constructor(private hrmService: HrmService,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getEmployees();

    this.employeePenaltyForm = this.formBuilder.group({
      employeeId: [null, Validators.required],
      penaltyType: [null, Validators.required],
      penaltyDate: [null, Validators.required],
      amount: [null, ],
      totNumber: [null,],
      fromSalary: [false],
      recursive:  [false],
      penalityendDate:  [null],
      remark:  [null],
    });

  }


  closeModal() {
    this.activeModal.close();
  }

  getEmployees() {
    this.dropDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.employeeList = res
      }
      , error: (err) => {
        console.error(err)
      }
    })
  }

  savePenalty() {
    
    var addPenalty: AddPenaltyDto = {
      employeeId: this.employeePenaltyForm.value.employeeId,
      amount: Number(this.employeePenaltyForm.value.amount),
      fromSalary: this.employeePenaltyForm.value.fromSalary,
      penaltyDate: this.employeePenaltyForm.value.penaltyDate,
      penaltyType:  Number(this.employeePenaltyForm.value.penaltyType),
      recursive:  this.employeePenaltyForm.value.recursive,
      remark:  this.employeePenaltyForm.value.remark,
      totNumber:  this.employeePenaltyForm.value.totNumber,
      createdById: this.user.userId,
    }
    if(this.employeePenaltyForm.value.penalityendDate != null){
      addPenalty.penalityendDate = this.employeePenaltyForm.value.penalityendDate;
    }
    this.hrmService.addPenalty(addPenalty).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Penalty Created', life: 3000 });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Check Your Fields', life: 3000 });
      }
    });
  }


  handleChange(e: any){
    this.recursive = e.checked
  }

  fromSalaryChange(e: any){
    this.fromSalary = e.checked
  }

}
