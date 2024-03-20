import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { MemberService } from 'src/app/services/member.service';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { ChangeIdStatusComponent } from '../change-id-status/change-id-status.component';
import { UserView } from 'src/models/auth/userDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requested-idcards',
  templateUrl: './requested-idcards.component.html',
  styleUrls: ['./requested-idcards.component.scss']
})
export class RequestedIdcardsComponent implements OnInit {
  first: number = 0;
  rows: number = 5;
  Members: IMembersGetDto[];
  paginatedMembers: IMembersGetDto[];
  searchTerm: string = '';
  userView : UserView
  ngOnInit(): void {
    this.getMemberss();
    this.userView = this.userService.getCurrentUser()
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private userService : UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: MemberService
  ) {}

  getMemberss() {
    this.controlService.getRequstedIdMembers().subscribe({
      next: (res) => {
        this.Members = res;

        this.paginateMembers();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateMembers();
  }

  getImagePath(url: string) {
    return this.commonService.createImgPath(url);
  }

  paginateMembers() {
    this.paginatedMembers = this.Members.slice(this.first, this.first + this.rows);
  }

  applyFilter() {
    const searchTerm = this.searchTerm.toLowerCase();

    this.paginatedMembers = this.Members.filter((item) => {
      return (
        item.fullName.toLowerCase().includes(searchTerm) ||
        item.phoneNumber.toLowerCase().includes(searchTerm) ||
        item.membershipType.toLowerCase().includes(searchTerm) ||
        item.region.toLowerCase().includes(searchTerm) ||
        item.inistitute.toLowerCase().includes(searchTerm) ||
        (item.instituteRole && item.instituteRole.toLowerCase().includes(searchTerm)) ||
        (item.gender && item.gender.toLowerCase().includes(searchTerm)) ||
        item.paymentStatus.toLowerCase().includes(searchTerm) ||
        item.expiredDate.toString().includes(searchTerm)
      );
    });
  }

  changeIdStatus(value: string,memberId : string ){
    let modalREf = this.modalService.open(ChangeIdStatusComponent,{backdrop:'static'})
    modalREf.componentInstance.memberId = memberId
    modalREf.componentInstance.approvalType = value

    modalREf.result.then(()=>{
      this.getMemberss()
    })
  }
}