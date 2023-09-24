import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonService } from 'src/app/services/common.service';
import { UserList } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UpdateRolesComponent } from './update-roles/update-roles.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users!: UserList[]
  filteredUserList: UserList[] = [];
  searchInput!:string
  p: number = 1;
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private userService: UserService) { }
  ngOnInit(): void {

    this.getUsers()

  }

  addUser() {

    let modalRef = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getUsers()
    })
  }

  updateUser(user:UserList){

    let modalRef = this.modalService.open(UpdateRolesComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.employee = user
    modalRef.result.then(() => {
      this.getUsers()
    })
  }

  getUsers() {

    this.userService.getUserList().subscribe({
      next: (res) => {
        this.users = res
        this.filteredUserList = res 
      }
    })

  }
  getPath(url: string) {

    return this.commonService.createImgPath(url)
  }

  searchUsers(value:string) {
    this.filteredUserList = this.users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.phoneNumber.includes(value)
    );
  }
}
