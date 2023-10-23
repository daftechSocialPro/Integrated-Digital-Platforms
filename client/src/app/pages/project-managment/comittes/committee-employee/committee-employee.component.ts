import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import { CommiteeAddEmployeeView, CommitteeView } from '../../../../model/PM/committeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-committee-employee',
  templateUrl: './committee-employee.component.html',
  styleUrls: ['./committee-employee.component.css']
})
export class CommitteeEmployeeComponent implements OnInit {

  @Input() committee!: CommitteeView;

  employees: SelectList[] = [];
  selectedEmployee!: string[];
  selectedEmployee2!: string[];
  user !: UserView;


  constructor(
    private activeModal: NgbActiveModal,
    private messageService:MessageService,
    private pmService: PMService,
    private commonService: CommonService,
    private userService: UserService) {

  }

  ngOnInit(): void {

    this.listOfEmployees()

    this.user = this.userService.getCurrentUser()

  }

  listOfEmployees() {
    this.pmService.getNotIncludedEmployees(this.committee.id
    ).subscribe({
      next: (res) => {
        this.employees = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  closeModal() {
    this.activeModal.close()
  }

  addEmpinCommittee() {


    console.log(this.selectedEmployee)
    
    if (this.selectedEmployee) {

      let empCommitte: CommiteeAddEmployeeView = {
        commiteeId: this.committee.id,
        employeeList: this.selectedEmployee,
        createdBy: this.user.userId

      }

      this.pmService.addEmployesInCommitee(empCommitte).subscribe({
        next: (res) => {

          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: ' Employee added to Project team Successfully' });              
          
     

          this.closeModal()
        }, error: (err) => {
          console.log(err)
        }
      })
    }



  }

  removeEmpinCommitee() {


    if (this.selectedEmployee2) {
      let empCommitte: CommiteeAddEmployeeView = {

        commiteeId: this.committee.id,
        employeeList: this.selectedEmployee2,
        createdBy: this.user.userId
      }
      this.pmService.removeEmployesInCommitee(empCommitte).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: ' Employee removed to Project team Successfully' });              
          
        
          this.closeModal()
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  }



}
