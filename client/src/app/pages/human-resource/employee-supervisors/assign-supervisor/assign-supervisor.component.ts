import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AssignSupervisorDto } from 'src/app/model/HRM/IEmployeeSupervisorDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assign-supervisor',
  templateUrl: './assign-supervisor.component.html',
  styleUrls: ['./assign-supervisor.component.css']
})
export class AssignSupervisorComponent implements OnInit {


  @Input() employeeId! : string 

  @Output() result = new EventEmitter<boolean>();

  isDisabled: boolean = false


  employeeList: SelectList[] = [];
  supervisorList: SelectList[] = [];
  secondSupervisorList: SelectList[] = [];


  selectEmployeee !: string;
  selectSupervisor !: string;
  selectSecondSupervisor !: string;
  supervisorForm!: FormGroup;

  ngOnInit(): void {

    this.selectEmployeee = this.userService.getCurrentUser().employeeId
    this.getEmployees()


    if (this.employeeId){
      this.isDisabled= true
      this.selectEmployeee = this.employeeId
   
    }
    this.supervisorForm = this.formBuilder.group({
      selectEmployeee: ['', Validators.required],
      selectSupervisor: ['', Validators.required],
      selectSecondSupervisor: ['', Validators.required],
    })

  }
  constructor(
    private dopdownService: DropDownService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private messageService: MessageService,
    private userService: UserService) {

   
  }



  getEmployees() {
    this.dopdownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.supervisorList = res;
        this.secondSupervisorList = this.supervisorList;
      }
      , error: (err) => {
        console.error(err)
      }
    });
    this.hrmService.getToBeSupervisedEmployees().subscribe({
      next: (res) => {
          this.employeeList = res;
      }
    })
  }

  submit() {

      var assignSupervisor: AssignSupervisorDto = {
        employeeId: this.selectEmployeee,
        createdById: this.userService.getCurrentUser().userId,
        supervisorId: this.selectSupervisor,
        secondSuprvisorId: this.selectSecondSupervisor,
      }
      this.hrmService.assignSupervisor(assignSupervisor).subscribe({

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

  closeModal() {
    this.activeModal.close()
  }

  selectEmployee(event: string) {
    if (event) {
      this.selectEmployeee = event

      this.supervisorList = this.supervisorList.filter(x => x.id != event);
      this.secondSupervisorList = this.supervisorList.filter(x => x.id != event);
    }
  }

  selectSupervisorEvent(event: string) {
    if (event) {
      this.selectSupervisor = event
      this.secondSupervisorList = this.supervisorList.filter(x => x.id != event);
    }
  }

  selectSecondSupervisorEvent(event: string) {
    if (event) {
      this.selectSecondSupervisor = event
    }
  }


}
