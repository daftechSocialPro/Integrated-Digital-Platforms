import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { UserList } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.css']
})
export class UpdateRolesComponent implements OnInit {


  @Input() employee!: UserList

  selectedCategory !: string
  roleCategory!: SelectList[]
  assignedRole!: SelectList[]
  notAssignedRoles !: SelectList[]
  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    this.userForm = this.formBuilder.group({

    });
  }

  ngOnInit(): void {

    this.getRoleCategory()
  }

  userForm!: FormGroup;


  getRoleCategory() {

    this.userService.getRoleCategory().subscribe({
      next: (res) => {

        this.roleCategory = res
      }
    })

  }
  onRoleCategorySelected(value: string) {
    this.selectedCategory = value
    this.getNoAssignedRole(parseInt(value))
    this.getAssignedRole(parseInt(value))
  }

  getNoAssignedRole(roleCategory: number) {

    this.userService.getNotAssignedRole(this.employee.id, roleCategory).subscribe({
      next: (res) => {
        this.notAssignedRoles = res

        console.log('notassigned', res)
      }
    })

  }
  getAssignedRole(roleCategory: number) {

    this.userService.getAssignedRole(this.employee.id, roleCategory).subscribe({
      next: (res) => {
        this.assignedRole = res
        console.log('assigned', res)
      }
    })
  }

  assignRole(roles: any) {

    this.userService.assignRole({
      userId: this.employee.id,
      roleName: roles
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

          this.onRoleCategorySelected(this.selectedCategory)

        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
        }
        this.closeModal();
      }
      , error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });

      }
    })
  }



  getSelectedRoleValues(selectElement: HTMLSelectElement): string[] {
    const selectedValues = [];
    for (let i = 0; i < selectElement.selectedOptions.length; i++) {
      selectedValues.push(selectElement.selectedOptions[i].value);
    }


    console.log(selectedValues)
    return selectedValues;
  }
  removeRole(roles: any) {

    this.userService.revokeRole({
      userId: this.employee.id,
      roleName: roles
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          this.onRoleCategorySelected(this.selectedCategory)
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
        }
        this.closeModal();
      }
      , error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });

      }
    })
  }

  closeModal() {

    this.activeModal.close()

  }


}
