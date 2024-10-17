import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

import { SelectList } from 'src/app/model/common';
import { UserPost } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() result = new EventEmitter<boolean>();

  userForm!: FormGroup;
  employeeList: SelectList[] = [];

  employee !: string;
  constructor(
    private hrmService: HrmService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      UserName: ['sample', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });


    this.getEmployees();
  }



  getEmployees() {

    this.hrmService.getEmployeesNoUserSelectList().subscribe({
      next: (res) => {
        this.employeeList = res
        
      }
      , error: (err) => {
        console.error(err)
      }
    })

  }


  submit() {

    if (this.userForm.valid && this.employee != null) {
      if (this.userForm.value.Password === this.userForm.value.ConfirmPassword) {
        let user: UserPost = {
          employeeId: this.employee,
          password: this.userForm.value.Password,
          userName: this.userForm.value.UserName
        }

        
        this.userService.createUser(user).subscribe({
          next: (res) => {
            if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message }); 
                }
          else{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });    
          }  
            this.closeModal();
          }
          , error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });

          }
        })


      }
      else {

      }
    }
    else {
    }

  }
  closeModal() {
    this.activeModal.close()
  }

  selectEmployee(event: string) {
    this.employee = event

  }

}

