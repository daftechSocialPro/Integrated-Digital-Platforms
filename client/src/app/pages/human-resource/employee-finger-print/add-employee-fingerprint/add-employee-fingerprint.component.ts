import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddEmployeeFingerPrintDto, EmployeeFingerPrintListDto, UpdateEmployeeFingerPrintDto } from 'src/app/model/HRM/IEmployeeFingerPrintDto';
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

  @Input() fingerPrint !: EmployeeFingerPrintListDto;
  fingerPrintForm!: FormGroup;
  user !: UserView;
  employeeList: SelectList[] = [];
  selectEmployeee: string = "";

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getEmployees();

    if(this.fingerPrint){
      this.fingerPrintForm = this.formBuilder.group({
        employeeId: [this.employeeList.find(x => x.name == this.fingerPrint.fullName)?.id],
        
        fingerPrint: [this.fingerPrint.fingerPrint, Validators.required]
      });


    }
  else{
    this.fingerPrintForm = this.formBuilder.group({
      employeeId: [''],
      fingerPrint: ['', Validators.required]
    });
  }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private dropDownService: DropDownService,
    private userService: UserService,
    private messageService: MessageService) {

     
    

  }


  getEmployees() {
    this.dropDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {        
        this.employeeList = res
      
        this.selectEmployeee = this.employeeList.find(x => x.name == this.fingerPrint.fullName)?.id!
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
        if(this.fingerPrint){


var updateFinger:UpdateEmployeeFingerPrintDto={
  id:this.fingerPrint.id,
  FingerPrintCode:this.fingerPrintForm.value.fingerPrint,
  employeeId: this.selectEmployeee
}


     
          this.hrmService.updateFingerPrint(updateFinger).subscribe({
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
        else{
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
          });
        }
        
      }
    }
  }

  selectEmployee(event: string) {
    if (event) {
      this.selectEmployeee = event;
    }
  }
}



