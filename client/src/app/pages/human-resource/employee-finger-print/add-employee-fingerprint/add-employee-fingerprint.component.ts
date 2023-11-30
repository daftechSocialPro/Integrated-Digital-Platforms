import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddEmployeeFingerPrintDto } from 'src/app/model/HRM/IEmployeeFingerPrintDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-fingerprint',
  templateUrl: './add-employee-fingerprint.component.html',
  styleUrls: ['./add-employee-fingerprint.component.css']
})
export class AddEmployeeFingerprintComponent implements OnInit {


  fingerPrintForm!: FormGroup;
  user !: UserView;
  employeeList: SelectList[] = [];
  selectEmployeee: string = "";

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getEmployees();
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private dropDownService: DropDownService,
    private userService: UserService,
    private messageService: MessageService) {

    this.fingerPrintForm = this.formBuilder.group({
      employeeId: [''],
      fingerPrint: ['', Validators.required]
    });

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

  closeModal() {
    this.activeModal.close();
  }

  submit() {

    if (this.fingerPrintForm.valid) {


      var fingerPrintPost: AddEmployeeFingerPrintDto = {
        employeeId: this.selectEmployeee,
        fingerPrint: this.fingerPrintForm.value.fingerPrint,
        createdById: this.user.userId
      }
      if (fingerPrintPost.employeeId == "") {
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: "Employee is Required" });
      }
      else {
        this.hrmService.addFingerPrint(fingerPrintPost).subscribe({
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

  selectEmployee(event: string) {
    if (event) {
      this.selectEmployeee = event;
    }
  }
}



