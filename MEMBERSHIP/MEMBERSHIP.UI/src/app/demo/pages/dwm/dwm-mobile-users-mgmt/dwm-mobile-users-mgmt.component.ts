import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { IMobileUsersDto } from 'src/models/dwm/IMobileUsersDto';
import { AddMobileUsersComponent } from './add-mobile-users/add-mobile-users.component';
import { CommonService } from 'src/app/services/common.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UpdateEmployeeComponent } from '../../employees/update-employee/update-employee.component';

@Component({
  selector: 'app-dwm-mobile-users-mgmt',
  templateUrl: './dwm-mobile-users-mgmt.component.html',
  styleUrls: ['./dwm-mobile-users-mgmt.component.scss']
})
export class DwmMobileUsersMgmtComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  mobileUsers: IMobileUsersDto[]
  paginatedMobileUsers: IMobileUsersDto[]

  ngOnInit(): void {
    this.getMobileUsers()
  }

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dwmService: DWMService,
    private modalService: NgbModal
  ) { }

  getMobileUsers() {

    this.dwmService.getMobileUsers().subscribe({
      next: (res) => {
        this.mobileUsers = res
        this.paginateMobileUsers(this.mobileUsers)
      }
    })

  }

  addMobileUsers() {

    let modalRef = this.modalService.open(AddMobileUsersComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getMobileUsers()
    })

  }
  updateMobileUsers(item: IMobileUsersDto) {

    let modalRef = this.modalService.open(AddMobileUsersComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.mobileUser = item
    modalRef.result.then(() => {
      this.getMobileUsers()
    })


  }
  removeMobileUsers(id: number) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Mobile User?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.dwmService.removeMobileUsers(id).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getMobileUsers()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }

          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })

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

  filterMobileUser(value: string) {
    
    var users= this.mobileUsers.filter((item) => item.role == value)
    if(value=='all'){
      users = this.mobileUsers
    }

    this.paginateMobileUsers(users)
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateMobileUsers(this.mobileUsers);
  }
  paginateMobileUsers(list:IMobileUsersDto[]) { 
    this.paginatedMobileUsers = list.slice(this.first, this.first + this.rows);
  }

  getImagePath(url: string) {

    return this.commonService.createImgPath(url)
  }
}
