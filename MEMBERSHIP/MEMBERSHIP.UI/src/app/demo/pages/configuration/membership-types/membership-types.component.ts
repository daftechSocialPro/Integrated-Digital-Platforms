import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IMembershipTypeGetDto } from 'src/models/configuration/IMembershipDto';
import { AddMembershipTypeComponent } from './add-membership-type/add-membership-type.component';
import { CourseComponent } from '../course/course.component';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';

@Component({
  selector: 'app-membership-types',
  templateUrl: './membership-types.component.html',
  styleUrls: ['./membership-types.component.scss']
})
export class MembershipTypesComponent implements OnInit {
  first: number = 0;
  rows: number = 3;
  MembershipType: IMembershipTypeGetDto[];
  paginatedMembershipType: IMembershipTypeGetDto[];
  formats: string[] = ['bold', 'italic'];

  userView : UserView
  ngOnInit(): void {
    this.getMembershipTypes();
    this.userView = this.userService.getCurrentUser()
  }

  constructor(
    private modalService: NgbModal,
    private userService : UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: ConfigurationService
  ) {}

  getMembershipTypes() {
    this.controlService.getMembershipTYpes().subscribe({
      next: (res) => {
        this.MembershipType = res;

        this.paginateMembershipType();
      }
    });
  }

  addMembershipType() {
    let modalRef = this.modalService.open(AddMembershipTypeComponent, { size: 'lg', backdrop: 'static' });

    modalRef.result.then(() => {
      this.getMembershipTypes();
    });
  }

  removeMembershipType(MembershipTypeId: string) {
    console.log(MembershipTypeId);
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this MembershipType?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteMembershipType(MembershipTypeId).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMembershipTypes();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
          }
        });
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

  VIewCourses(membershipType: IMembershipTypeGetDto) {
    let modalRef = this.modalService.open(CourseComponent, { size: 'xl', backdrop: 'static' });

    modalRef.componentInstance.MembershipType = membershipType;
  }

  updateMembershipType(MembershipType: IMembershipTypeGetDto) {
    let modalRef = this.modalService.open(AddMembershipTypeComponent, { size: 'lg', backdrop: 'static' });

    modalRef.componentInstance.MembershipType = MembershipType;

    modalRef.result.then(() => {
      this.getMembershipTypes();
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateMembershipType();
  }

  paginateMembershipType() {
    this.paginatedMembershipType = this.MembershipType.slice(this.first, this.first + this.rows);
  }
}
