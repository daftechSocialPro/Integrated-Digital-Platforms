import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonService } from 'src/app/services/common.service';
import { UserList, UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UpdateRolesComponent } from './update-roles/update-roles.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ChangePasswordComponent } from './change-password/change-password.component';

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
    private confirmationService: ConfirmationService,
    private messageService :MessageService,
    private userService: UserService) { }
  ngOnInit(): void {

    this.getUsers()

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
    debugger;
    this.filteredUserList = this.users.filter(user =>
      user.name.includes(value) ||
      user.phoneNumber.includes(value) || 
      user.userName.includes(value)
      
    );
  }

  addUser (){
    let modalRef = this.modalService.open(AddUserComponent,{size:'lg',backdrop:'static'})
  }

  deleteUser(userId:string){

    this.confirmationService.confirm({
      message: `Are You sure you want to delete User?`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: (res) => {
                if (res.success) {
                  this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                  this.getUsers()
                  
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
                }
              },
              error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
              }
        })
      
        // this.financeService.approvePayment(approvePay).subscribe({
        //   next: (res) => {
        //     if (res.success) {
        //       this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              
        //     }
        //     else {
        //       this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
        //     }
        //   },
        //   error: (err) => {
        //     this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        //   }
        // })
  
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });

  }

  changePassword(user:UserList){
    let modalRef = this.modalService.open(ChangePasswordComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.user=user
    modalRef.componentInstance.isReset = false
    modalRef.result.then((res)=>{
      this.getUsers()
    });
  }

  ResetPassword(user: UserList){
    let modalRef = this.modalService.open(ChangePasswordComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.user=user
    modalRef.componentInstance.isReset = true
    modalRef.result.then((res)=>{
      this.getUsers()
    });
  }

  
}
