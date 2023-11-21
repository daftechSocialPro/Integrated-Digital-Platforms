import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { RehireEmployeeDto } from 'src/app/model/HRM/IRehireEmployeeDto';
import { TerminationRequesterDto } from 'src/app/model/HRM/IResignationDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rehire-employee',
  templateUrl: './rehire-employee.component.html',
  styleUrls: ['./rehire-employee.component.css']
})
export class RehireEmployeeComponent implements OnInit {

  @Input() empId !: string
  rehireForm!: FormGroup;
   user !: UserView;
   departments!: SelectList[];
   positions!: SelectList[];
   currentDate: Date = new Date();

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private userService: UserService,
    private messageService: MessageService,
    private dropService: DropDownService) {
  }
 

  ngOnInit(): void {
    this.getDepartments();
    this.getPositions();
    this.user = this.userService.getCurrentUser();
    this.rehireForm = this.formBuilder.group({
      employmentDate: [null, Validators.required],
      employmentType: [null, Validators.required],
      contractEndDate: [null],
      positionId: ['', Validators.required],
      departmentId: ['', Validators.required],
      sourceOfSalary: ['', Validators.required],
      salary: [null, Validators.required],
      remark: ['']
    });
  }


  getDepartments() {
    this.dropService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res
      }
    })
  }

  getPositions() {
    this.dropService.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
      }
    })
  }

   closeModal() {
     this.activeModal.close();
   }

   submit (){
     if (this.rehireForm.valid){
       var rehirePost : RehireEmployeeDto ={
         employeeId : this.empId,
         remark : this.rehireForm.value.remark,
         createdById: this.user.userId,
         employmentDate: this.rehireForm.value.employmentDate,
         employmentType: Number(this.rehireForm.value.employmentType),
         contractEndDate: this.rehireForm.value.contractEndDate,
         positionId: this.rehireForm.value.positionId,
         departmentId: this.rehireForm.value.departmentId,
         salary: Number(this.rehireForm.value.salary),
         sourceOfSalary: Number(this.rehireForm.value.sourceOfSalary),
       }
       
       this.hrmService.rehireEmployee(rehirePost).subscribe({
         next:(res)=>{
           if (res.success){
             this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
             this.closeModal();
           }
           else {
             this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
           }
         },
         error:(err)=>{
           this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
         }
       });
     }
 
   }
 
 }
 